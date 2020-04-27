import React from "react";
import { Link } from "react-router-dom";
import "./AccountSettings.css";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// export default function AccountSettings() {
//
//   );
// }

export default class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      blocked: [],
    };
  }

  /*Deletes the user's profile */
  deleteProfile() {
    alert("Your account is being deleted....");
    var delayInMilliseconds = 1000; //1 second
    setTimeout(function () {}, delayInMilliseconds);
    fetch("http://stark.cse.buffalo.edu/cse410/deldev/api/usercontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "deleteUsers",
        user_id: sessionStorage.getItem("userID"),
        session_token: sessionStorage.getItem("token"),
        userid: sessionStorage.getItem("userID"),
      }),
    })
      // .then((res) => res.json())
      // .then((response) => {
      //   this.setState({
      //     posts: response.posts ? response.posts : [],
      //   });
      // });

      .then((res) => res.json())
      .then((response) => {
        if (response.Exception == null) {
          document.getElementById("logout").click();
        }
      });
  }

  /*Gets the list of blocked users*/
  blockedUsers() {
    fetch("http://stark.cse.buffalo.edu/cse410/deldev/api/gmcontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getGroupMembers",
        user_id: this.props.match.params.userID,
        session_token: sessionStorage.getItem("token"),
        gmid: 7 /* response.group_members
          ? response.group_members[0].gm_id
          : undefined */,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        /* if (data.connections != null) { //We shouldn't be using data.connections
          this.setState({ blocked: [...data.connections] }); 
        } */
      });
  }

  render() {
    return (
      <main>
        <div className="TheBox">
          <h1 className="Header">ACCOUNT SETTINGS</h1>
          <br />
          <Link to="/forgot-password" className="ChangePassword">
            {" "}
            Change Your Password{" "}
          </Link>
          <br />
          <Link to="/settings" className="ChangeUsername">
            {" "}
            Change Your Username
          </Link>
          <br />
          <br />
          <br />
          <div className="Delete">
            <h2 className="DeleteAccount">Delete Your Account</h2>
            <Link to="/login">
              <FontAwesomeIcon
                className={"DeleteButton"}
                icon={faTrashAlt}
                onClick={this.deleteProfile}
                size="2x"
                color="black"
              />
            </Link>
          </div>
        </div>
      </main>
    );
  }
}
