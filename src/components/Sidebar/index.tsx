"use client";

import { FaBars } from "react-icons/fa";
import styles from "./sidebar.module.css";
import { useState } from "react";
import Link from "next/link";

const list = [
  { name: "Characters", url: "/" },
  { name: "Planets", url: "/planet" },
  { name: "Vehicles", url: "/vehicle" },
];

const Sidebar = () => {
  const [displayNav, setDisplayNav] = useState(false);
  const clickHandler = () => setDisplayNav((prev) => !prev);

  return (
    <nav className={styles.navbar}>
      <h2>
        <FaBars onClick={clickHandler} />
      </h2>
      <div
        className={styles.links}
        style={{ display: displayNav ? "flex" : "none" }}
      >
        {list.map((elem) => (
          <Link href={elem.url} key={elem.url}>
            <h2>{elem.name}</h2>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
