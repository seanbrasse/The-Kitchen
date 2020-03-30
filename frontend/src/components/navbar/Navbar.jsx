<<<<<<< HEAD
import React, { Fragment } from 'react';
import { withRouter } from "react-router";
=======
import React from "react";
>>>>>>> origin/user-profile
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

<<<<<<< HEAD
class Navbar extends React.Component {
  logout() {
    fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/SocialAuth.php', {
      method: 'post',
      body: JSON.stringify({
        action: 'logout',
        username: sessionStorage.getItem('userEmail'),
        session_token: sessionStorage.getItem('token')
      })
    });
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userEmail');
    this.props.history.replace('/');
  }

  render() {
    return (
      <nav className={styles.navbar}>
        <NavLink to="/feed" className={styles.logo}>The Kitchen</NavLink>
        <ul>
          <li>
            <NavLink to="/feed" activeClassName={styles.active}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/search" activeClassName={styles.active}>Search</NavLink>
          </li>
  
          <div className={styles.rightNav}>
            { sessionStorage.getItem('userID') ?
              <Fragment>
                <li>
                  <NavLink to={"/user/" + sessionStorage.getItem('userID')}>My Profile</NavLink>
                </li>
                <li>
                  <NavLink to="#" onClick={e => {e.preventDefault(); this.logout()}}>Logout</NavLink>
                </li>
              </Fragment>
            : '' }
          </div>
        </ul>
      </nav>
    );
  }
=======
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
>>>>>>> origin/user-profile
}

export default withRouter(Navbar);
