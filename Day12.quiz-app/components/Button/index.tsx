import Link from "next/link";
import styles from "./Button.module.css";
import { ReactNode } from "react";

interface ButtonProps {
  name: string;

  href?: string;
  onClick?: () => void;
}

export const Button = ({ name, href, onClick }: ButtonProps) => {
  return (
    <>
      {href ? (
        <Link href={href ?? ""} style={{ textDecoration: "none" }}>
          <button className={styles.button} onClick={onClick}>
            {name}
          </button>
        </Link>
      ) : (
        <button className={styles.button} onClick={onClick}>
          {name}
        </button>
      )}
    </>
  );
};
