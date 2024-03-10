import './TagButton.css';
import { VscChromeClose } from 'react-icons/vsc';

interface TagButtonProps {
  key: string;
  name: string;
  isChecked?: boolean;
  onClick?: () => void;
  onCheck?: () => void;
}

export const TagButton = ({ key, name, isChecked, onClick, onCheck }: TagButtonProps) => {
  return (
    <button className={`tag-button ${isChecked && 'checked'}`} key={key} onClick={onCheck}>
      <span> {name}</span>
      {onClick && <span className="tag-close-icon">{<VscChromeClose onClick={onClick} />}</span>}
    </button>
  );
};
