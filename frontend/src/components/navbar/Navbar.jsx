import React from 'react';
import { NavLink } from "react-router-dom";
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <NavLink to="/feed">The Kitchen</NavLink>
      <ul>
        <li>
          <NavLink to="/feed" activeClassName={styles.active}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/search" activeClassName={styles.active}>Search</NavLink>
        </li>

        <div class={styles.rightNav}>
          { sessionStorage.getItem('userID') ?
            <li>
              <NavLink to={"/user/" + sessionStorage.getItem('userID')}>My Profile</NavLink>
            </li>
          : '' }
        </div>
      </ul>
    </nav>
  );
}
