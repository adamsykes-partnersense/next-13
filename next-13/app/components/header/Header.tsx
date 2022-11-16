"use client";

import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./header.module.css";

export default function Header() {
  const pathname = usePathname();
  const controls = useAnimation();

  useEffect(() => {
    const currentLink = document.querySelector(
      `.${styles.header} a[href='${pathname}']`
    );

    if (!currentLink) return;

    const item = currentLink.getBoundingClientRect();

    controls.set({
      x: item.x,
      width: item.width,
      opacity: 1,
    });
  }, []);

  const goToNavItem = (e: React.MouseEvent<HTMLElement>) => {
    const item = e.currentTarget.getBoundingClientRect();

    controls.start({
      x: item.x,
      width: item.width,
      opacity: 1,
    });
  };

  return (
    <header className={styles.header}>
      <motion.div className={styles.bgBox} animate={controls} />
      <ul>
        <li>
          <Link
            href="/"
            onClick={(e) => goToNavItem(e)}
            className={`${pathname === "/" ? styles.active : ""}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/playground"
            onClick={(e) => goToNavItem(e)}
            className={`${pathname === "/playground" ? styles.active : ""}`}
          >
            Playground
          </Link>
        </li>
      </ul>
    </header>
  );
}
