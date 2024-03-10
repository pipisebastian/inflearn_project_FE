import './TextButton.css';
import { ReactNode } from 'react';

interface TextButtonProps {
  name: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export const TextButton = ({ name, icon, onClick }: TextButtonProps) => {
  return (
    <button className="text-button" onClick={onClick}>
      {icon && <span> {icon}</span>}
      <span> {name}</span>
    </button>
  );
};
