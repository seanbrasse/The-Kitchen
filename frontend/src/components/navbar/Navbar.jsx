import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from 'assets/KitchenLogo.png';

class Navbar extends React.Component {
  logout() {
    fetch("http://stark.cse.buffalo.edu/cse410/deldev/api/SocialAuth.php", {
      method: "post",
      body: JSON.stringify({ 
        action: "logout",
        username: sessionStorage.getItem("userEmail"),
        session_token: sessionStorage.getItem("token"),
      }),
    });
    sessionStorage.removeItem("userID");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userEmail");
    this.props.history.replace("/");
  }

  render() {
    return (
      <nav className={styles.navbar}>
        <div className={styles.logoWrapper}>
          <NavLink to="/feed" className={styles.logo}>
            <img src={logo} style={{height: '40px', marginRight: '5px'}}/>
            The Kitchen
          </NavLink>
        </div>
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

            {sessionStorage.getItem("userID") ? (
              <Fragment>
                <li style={{marginLeft: 'auto'}}>
                  <NavLink to={"/recipe/create"}>Create Post</NavLink>
                </li>
                <li>
                  <NavLink to={"/user/" + sessionStorage.getItem("userID")}>
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#"
                    id="logout"
                    onClick={(e) => {
                      e.preventDefault();
                      this.logout();
                    }}
                  >
                    Logout
                  </NavLink>
                </li>
              </Fragment>
            ) : (
              ""
            )}
        </ul>
      </nav>
    );
  }
}

export default withRouter(Navbar);
