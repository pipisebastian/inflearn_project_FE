import React, { useRef } from 'react';
import '../Modal.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { TagButton } from '../../Button/TagButton/TagButton';
import { selectTag, addTag, deleteTag } from '../../../redux/slice/TagSlice';

interface TagsInputProps {
  tags: string[];
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TagEditModal: React.FC<TagsInputProps> = ({ tags: initialTags, setModalOpen }) => {
  const tags = useAppSelector(selectTag);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const removeTags = (tagName: string) => {
    dispatch(deleteTag(tagName));
  };

  const addTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && event.currentTarget.value.trim() !== '') {
      const newTag = event.currentTarget.value.trim();
      if (tags.includes(newTag)) {
        return;
      }

      dispatch(addTag(newTag));
      event.currentTarget.value = '';
    }
  };

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="tag-modal" ref={ref}>
          <div>
            <span>Edit Tag</span>
            <span onClick={() => setModalOpen(false)} className="modal-close">
              X
            </span>
          </div>

          <input
            className="input"
            type="text"
            onKeyUp={(event) => addTags(event)}
            placeholder="추가할 태그를 입력해주세요"
          />
          <div className="tags-input">
            <ul id="tags">
              {tags.map((tag, index) => (
                <TagButton
                  key={tag.toString()}
                  name={tag.toString()}
                  onClick={() => removeTags(tag.toString())}
                  onCheck={() => {}}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagEditModal;
