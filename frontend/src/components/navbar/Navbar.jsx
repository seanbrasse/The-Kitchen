import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

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

  swapAB() {
    if (sessionStorage.getItem("smallCards")) {
      sessionStorage.removeItem("smallCards");
    } else {
      sessionStorage.setItem("smallCards", true);
    }
    window.location.reload();
  }

  render() {
    return (
      <nav className={styles.navbar}>
        <NavLink to="/feed" className={styles.logo}>
          The Kitchen
        </NavLink>
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

          <div className={styles.rightNav}>
            {sessionStorage.getItem("userID") ? (
              <Fragment>
                <li>
                  <NavLink
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      this.swapAB();
                    }}
                  >
                    Swap AB Test
                  </NavLink>
                </li>
                <li>
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
          </div>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Navbar);
