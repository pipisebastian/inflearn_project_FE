import './IconButton.css';
import { ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
}

export const IconButton = ({ icon, onClick }: IconButtonProps) => {
  return (
    <button className="icon-button" onClick={onClick}>
      <span> {icon}</span>
    </button>
  );
};
