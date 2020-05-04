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
  blockedUserList() {
    fetch("http://stark.cse.buffalo.edu/cse410/deldev/api/gmcontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getGroupMembers",
        groupid: sessionStorage.getItem("blocked_groupID"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.group_members != null) {
          this.setState({ blocked: [...data.group_members] });
        }
      });
    console.log(this.state.blocked);
  }

  componentDidMount() {
    this.blockedUserList();
  }

  componentDidUpdate(prevProps) {
    if (this.props.userID !== prevProps.userID) {
      this.setState({
        blocked: [],
      });
      this.blockedUserList();
    }
  }

  render() {
    var list = [];
    var i = 0;
    if (this.state.blocked.length != 0) {
      this.state.blocked.forEach((ele) => {
        list.push(
          <li>
            <Link to={`/user/${ele.user_id}`}>{`User ${ele.user_id}`}</Link>
          </li>
        );
      });
    } else {
      list.push(<h3>No Blocked Users</h3>);
    }
    return (
      <main className="TheBoxContainer">
        <div className="TheBox card">
          <h1 className="Header">Account Settings</h1>
          <br />
          <Link to="/forgot-password" className="ChangePassword">
            {" "}
            Change Your Password{" "}
          </Link>
          <br />
          <div className="BlockedList">
            <h2>Blocked Users</h2>
            <ul class="unstyled">
            {list}
            </ul>
          </div>
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
