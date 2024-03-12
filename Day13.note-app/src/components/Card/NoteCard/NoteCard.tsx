import React from 'react';

import { useAppDispatch } from '../../../hooks/hooks';
import { AiFillPushpin, AiOutlinePushpin } from 'react-icons/ai';
import { BsArchive, BsArchiveFill, BsTrash3, BsTrash3Fill } from 'react-icons/bs';
import styles from './NoteCard.module.css';
import { IconButton } from '../../Button/IconButton/IconButton';
import { TagButton } from '../../Button/TagButton/TagButton';
import { VscEdit, VscCircleSlash } from 'react-icons/vsc';
import color from '../../../constants/color';
import { changePinned, changeState, deleteNote } from '../../../redux/slice/NoteSlice';
import { useLocation } from 'react-router-dom';
import { Note } from '../../../type';
import ReactQuill from 'react-quill';
import { format } from 'date-fns';

export const NoteCard = (
  noteCardProps: Note & {
    setNoteEditModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedNote?: React.Dispatch<React.SetStateAction<Note | undefined>>;
  },
) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const currentPath = decodeURI(location.pathname);
  const isMainPage = currentPath === '/';
  const isTagPage = currentPath.includes('/tag');
  const isArchivePage = currentPath === '/archive';
  const isTrashPage = currentPath === '/trash';

  return (
    <div className={`${styles.container} ${noteCardProps.color === 'SKY' ? styles.containerSky : ''}`}>
      <div className={styles.title}>
        {noteCardProps.title}
        <div>
          <span style={{ marginRight: '6px', fontSize: '1rem' }}>
            {noteCardProps.isHighPriority === true ? 'HIGH' : 'LOW'}
          </span>
          {isMainPage && (
            <IconButton
              icon={
                noteCardProps.isPinned ? (
                  <AiFillPushpin color={color.green500} />
                ) : (
                  <AiOutlinePushpin color={color.green500} />
                )
              }
              onClick={() => {
                dispatch(changePinned({ id: noteCardProps.id }));
              }}
            />
          )}
        </div>
      </div>
      <ReactQuill
        style={{ width: '400px', height: '100px' }}
        value={noteCardProps.content}
        readOnly={true}
        theme={'bubble'}
      />
      <div style={{ display: 'flex', gap: '6px' }}>
        {noteCardProps.selectedTags?.map((tag) => {
          return <TagButton key={tag} name={tag} />;
        })}
      </div>
      <span className={styles.end}>
        <span>{format(noteCardProps.createdDate, 'yyyy-MM-dd')}</span>

        <span>
          {(isMainPage || isTagPage) && (
            <IconButton
              icon={<VscEdit color={color.green500} />}
              onClick={() => {
                console.log('noteCardProps', noteCardProps);
                noteCardProps.setSelectedNote!(noteCardProps);
                noteCardProps.setNoteEditModalOpen!(true);
              }}
            />
          )}
          {(isArchivePage || isMainPage || isTagPage) && (
            <IconButton
              icon={
                noteCardProps.state === 'ARCHIVED' ? (
                  <BsArchiveFill color={color.green500} />
                ) : (
                  <BsArchive color={color.green500} />
                )
              }
              onClick={() => {
                dispatch(
                  changeState({
                    id: noteCardProps.id,
                    state: noteCardProps.state !== 'ARCHIVED' ? 'ARCHIVED' : 'ACTIVE',
                  }),
                );
              }}
            />
          )}
          <IconButton
            icon={
              noteCardProps.state === 'DELETED' ? (
                <BsTrash3Fill color={color.green500} />
              ) : (
                <BsTrash3 color={color.green500} />
              )
            }
            onClick={() => {
              dispatch(
                changeState({
                  id: noteCardProps.id,
                  state: noteCardProps.state !== 'DELETED' ? 'DELETED' : 'ACTIVE',
                }),
              );
            }}
          />
          {noteCardProps.state === 'DELETED' && isTrashPage && (
            <IconButton
              icon={
                <VscCircleSlash
                  color="red"
                  onClick={() => {
                    dispatch(
                      deleteNote({
                        id: noteCardProps.id,
                      }),
                    );
                  }}
                />
              }
            />
          )}
        </span>
      </span>
    </div>
  );
};
