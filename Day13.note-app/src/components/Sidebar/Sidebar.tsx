import { useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { selectTag } from '../../redux/slice/TagSlice';
import { TextButton } from '../Button/TextButton/TextButton';
import './Sidebar.css';
import { AiFillTag } from 'react-icons/ai';
import TagEditModal from '../Modal/TagEditModal/TagEditModal';
import { VscArchive, VscEdit, VscTrash, VscLightbulb } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const navigate = useNavigate();
  const tags = useAppSelector(selectTag);
  const [tagEditModalOpen, setTagEditModalOpen] = useState(false);

  const handleEditModal = () => {
    setTagEditModalOpen((prev) => !prev);
  };

  return (
    <div className="header-container">
      <span className="header-title ">KEEP</span>
      <TextButton name="Notes" icon={<VscLightbulb />} onClick={() => navigate(`/`)} />
      <div className="divider" />
      {tags.length !== 0 &&
        tags.map((tag) => (
          <TextButton
            key={tag.toString()}
            name={tag.toString()}
            icon={<AiFillTag />}
            onClick={() => navigate(`/tag/${tag}`)}
          />
        ))}
      {tags.length !== 0 && <div className="divider" />}
      <TextButton name="Edit Tags" onClick={handleEditModal} icon={<VscEdit />} />
      <TextButton name="Archive" icon={<VscArchive />} onClick={() => navigate(`/archive`)} />
      <TextButton name="Trash" icon={<VscTrash />} onClick={() => navigate(`/trash`)} />
      {tagEditModalOpen && <TagEditModal setModalOpen={handleEditModal} tags={[]} />}
    </div>
  );
};
