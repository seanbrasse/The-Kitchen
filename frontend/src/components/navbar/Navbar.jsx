import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  var user_id = sessionStorage.getItem("userID");
  var url = "/user/" + user_id;

  return (
    <nav className={styles.navbar}>
      <NavLink to="/feed">The Kitchen</NavLink>
      <ul>
        <li>
          <NavLink to="/feed" activeClassName={styles.active}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" activeClassName={styles.active}>
            Search
          </NavLink>
        </li>
        <li>
          {" "}
          {/* userLoggedIn ? */}
          <NavLink to={url} activeClassName={styles.active}>
            My Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
