import React, { useRef, useState } from 'react';
import '../Modal.css';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';

import ReactQuill, { Quill } from 'react-quill';
import TagEditModal from '../TagEditModal/TagEditModal';
import { TextButton } from '../../Button/TextButton/TextButton';
import { VscAdd } from 'react-icons/vsc';
import { addNote, editNote } from '../../../redux/slice/NoteSlice';
import { selectTag } from '../../../redux/slice/TagSlice';
import { Note } from '../../../type';
import { ImageResize } from 'quill-image-resize-module-ts';

Quill.register('modules/ImageResize', ImageResize);

const NoteEditModal = (
  props: Note & {
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  },
) => {
  const tags = useAppSelector(selectTag);
  const dispatch = useAppDispatch();

  const [tagEditModalOpen, setTagEditModalOpen] = useState(false);

  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [selectedTags, setSelectedTags] = useState(props.selectedTags);
  const [priority, setPriority] = useState(props.isHighPriority ? 'high' : 'low');
  const [color, setBackgroundColor] = useState(props.color);

  const ref = useRef<HTMLDivElement>(null);

  const handleClickEditTagButton = () => {
    setTagEditModalOpen(true);
  };

  const handleClickAddNoteButton = () => {
    const newNote: Note = {
      id: props.id,
      title: title,
      content: content,
      selectedTags: selectedTags,
      createdDate: new Date(),
      isHighPriority: priority === 'high' ? true : false,
      color: color === 'WHITE' ? 'WHITE' : 'SKY',
      isPinned: false,
      state: 'ACTIVE',
    };

    isAddMode ? dispatch(addNote(newNote)) : dispatch(editNote(newNote));
    props.setModalOpen(false);
  };

  const isAddMode = props.title === '';

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="note-modal" ref={ref}>
          <span>{isAddMode ? 'NOTE 추가' : 'NOTE 수정'}</span>
          <button className="edit-button" onClick={handleClickEditTagButton}>
            태그 편집
          </button>
          <div onClick={() => props.setModalOpen(false)} className="modal-close">
            X
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginTop: '12px',
              color: 'black',
              fontWeight: 400,
            }}
          >
            <input
              className="input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={{
                toolbar: [
                  ['italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                  ['image'],
                ],
                ImageResize: {
                  parchment: Quill.import('parchment'),
                  modules: ['Resize', 'DisplaySize'],
                },
              }}
            />
          </div>

          <div className="tags-input">
            <ul id="tags">
              {tags.map((tag) =>
                selectedTags.includes(tag.toString()) ? (
                  <p
                    className="tag-checked"
                    onClick={() => {
                      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag.toString()));
                    }}
                  >
                    # {tag}
                  </p>
                ) : (
                  <p
                    className="tag"
                    onClick={() => {
                      setSelectedTags([...selectedTags, tag.toString()]);
                    }}
                  >
                    # {tag}
                  </p>
                ),
              )}
            </ul>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',

              gap: '8px',
              alignItems: 'flex-end',
            }}
          >
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
                <input type="radio" id="high-edit" checked={priority === 'high'} onClick={() => setPriority('high')} />
                <label htmlFor="high-edit">high</label>
                <input type="radio" id="low-edit" checked={priority === 'low'} onClick={() => setPriority('low')} />
                <label htmlFor="low-edit">low</label>
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
                색상
              </span>
              <div className="radio-wrap">
                <input
                  type="radio"
                  id="WHITE"
                  value="WHITE"
                  checked={color === 'WHITE'}
                  onChange={() => setBackgroundColor('WHITE')}
                />
                <label htmlFor="WHITE">white</label>
                <input
                  type="radio"
                  id="SKY"
                  value="SKY"
                  checked={color === 'SKY'}
                  onChange={() => setBackgroundColor('SKY')}
                />
                <label htmlFor="SKY">sky</label>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '20px',
            }}
          >
            <TextButton icon={<VscAdd />} name={isAddMode ? '추가' : '수정'} onClick={handleClickAddNoteButton} />
          </div>
        </div>
      </div>
      {tagEditModalOpen && <TagEditModal tags={props.selectedTags} setModalOpen={setTagEditModalOpen} />}
    </div>
  );
};

export default NoteEditModal;
