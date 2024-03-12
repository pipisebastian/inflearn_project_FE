import { NoteCard } from '../../components/Card/NoteCard/NoteCard';
import styles from './Note.module.css';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import {
  selectNote,
  sortDateLatest,
  sortDateOldest,
  sortPriorityHigh,
  sortPriorityLow,
} from '../../redux/slice/NoteSlice';
import NoteEditModal from '../../components/Modal/NoteEditModal/NoteEditModal';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TextButton } from '../../components/Button/TextButton/TextButton';
import { VscAdd } from 'react-icons/vsc';
import { Note } from '../../type';

export const NotePage = () => {
  // url
  const location = useLocation();
  const currentPath = decodeURI(location.pathname);

  const isMainPage = currentPath === '/';
  const isArchivePage = currentPath === '/archive';
  const isTrashPage = currentPath === '/trash';
  const tag = currentPath.split('/')[2];

  // redux
  const note = useAppSelector(selectNote);
  const dispatch = useAppDispatch();

  const [selectedNote, setSelectedNote] = useState<Note>();
  const [noteEditModalOpen, setNoteEditModalOpen] = useState(false);
  const pinnedNote = note.filter((note) => note.isPinned === true);
  const unpinnedNote = note.filter((note) => note.isPinned === false);
  const tagNote = note.filter((note) => note.selectedTags.includes(tag));
  const archiveNote = note.filter((note) => note.state === 'ARCHIVED');
  const trashNote = note.filter((note) => note.state === 'DELETED');

  const [priority, setPriority] = useState('high');
  const [sortDate, setSortDate] = useState('latest');

  const handleAddNote = () => {
    setNoteEditModalOpen(true);
  };

  useEffect(() => {
    if (!noteEditModalOpen) {
      setSelectedNote(undefined);
    }
  }, [noteEditModalOpen]);

  const returnNoteCard = (note: any) => {
    return (
      <NoteCard
        key={note.id}
        id={note.id}
        title={note.title}
        content={note.content}
        selectedTags={note.selectedTags}
        createdDate={note.createdDate}
        isHighPriority={note.isHighPriority}
        isPinned={note.isPinned}
        state={note.state}
        color={note.color}
        setSelectedNote={setSelectedNote}
        setNoteEditModalOpen={setNoteEditModalOpen}
      />
    );
  };

  return (
    <div className={styles.wrapper}>
      {isMainPage && (
        <div className={styles.sort}>
          <div
            style={{
              display: 'flex',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontSize: '0.9rem',
              }}
            >
              우선순위
            </span>
            <div className="radio-wrap">
              <input
                type="radio"
                id="high"
                value="high"
                checked={priority === 'high'}
                onClick={() => {
                  setPriority('high');
                  dispatch(sortPriorityHigh());
                }}
              />
              <label htmlFor="high">high</label>
              <input
                type="radio"
                id="low"
                value="low"
                checked={priority === 'low'}
                onClick={() => {
                  setPriority('low');
                  dispatch(sortPriorityLow());
                }}
              />
              <label htmlFor="low">low</label>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontSize: '0.9rem',
              }}
            >
              날짜
            </span>
            <div className="radio-wrap">
              <input
                type="radio"
                id="latest"
                name="color"
                value="latest"
                checked={sortDate === 'latest'}
                onClick={() => {
                  setSortDate('latest');
                  dispatch(sortDateLatest());
                }}
              />
              <label htmlFor="latest">최신순</label>
              <input
                type="radio"
                id="oldest"
                name="color"
                value="oldest"
                checked={sortDate === 'oldest'}
                onClick={() => {
                  setSortDate('oldest');
                  dispatch(sortDateOldest());
                }}
              />
              <label htmlFor="oldest">오래된 순</label>
            </div>
          </div>
        </div>
      )}
      {isMainPage && (
        <>
          <p>Pinned Note ({pinnedNote.length})</p>
          <div className={styles.contents}>{pinnedNote.map((note) => returnNoteCard(note))}</div>
          <p>unPinned Note ({unpinnedNote.length})</p>
          <div className={styles.contents}>{unpinnedNote.map((note) => returnNoteCard(note))}</div>
        </>
      )}

      <div className={styles.contents}>
        {tag !== undefined && tagNote.map((note) => returnNoteCard(note))}
        {isArchivePage && archiveNote.map((note) => returnNoteCard(note))}
        {isTrashPage && trashNote.map((note) => returnNoteCard(note))}
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}
      >
        <TextButton name="ADD" icon={<VscAdd size={20} />} onClick={handleAddNote} />
      </div>

      {noteEditModalOpen &&
        (selectedNote !== undefined ? (
          <NoteEditModal
            id={selectedNote.id}
            title={selectedNote.title}
            content={selectedNote.content}
            selectedTags={selectedNote.selectedTags}
            createdDate={selectedNote.createdDate}
            isHighPriority={selectedNote.isHighPriority}
            color={selectedNote.color === 'WHITE' ? 'WHITE' : 'SKY'}
            isPinned={selectedNote.isPinned}
            state={selectedNote.state}
            setModalOpen={setNoteEditModalOpen}
          />
        ) : (
          <NoteEditModal
            id={note.length + 1}
            title=""
            content=""
            selectedTags={[]}
            createdDate={new Date()}
            isHighPriority={true}
            color="WHITE"
            setModalOpen={setNoteEditModalOpen}
            isPinned={false}
            state={'ACTIVE'}
          />
        ))}
    </div>
  );
};
