"use client";

import { useRouter } from "next/router";
import { Button } from "../Button";
import styles from "./Header.module.css";
import Link from "next/link";

// const router = useRouter();

export const Header = () => {
  return (
    <div className={styles.container}>
      <span>QUIZ</span>
      <div className={styles.buttonGroup}>
        <Button name="Home" href="/" />
        <Button name="Question" href="/question" />{" "}
        <Button name="State" href="/state" />
        <Button name="Quiz" href="/quiz" />
      </div>
    </div>
  );
};
