import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import avatar from "./img_avatar.png";
import FollowButton from "./FollowButton/FollowButton";
import {
  faEllipsisV,
  faEdit,
  faCog,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Profile.css";
import { PostList } from "components";
// import AccountSettings from './../account-settings/AccountSettings';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      followers: [],
      following: [],
      hidden: true,
      picID: 0,
      profileImageTemp: avatar,
      profileImage: avatar,
      blocked: false,
      currentlyFollowed: false,
      loadingFollowStatus: true,
      connectionID: undefined,
    };
  }

  /*********************************API_WORK*********************************/

  /*Gets Following for the Following List*/
  getFollowing() {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/deldev/api/connectioncontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "getConnections",
          userid: this.props.match.params.userID,
          connectionstatus: "Active",
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.connections != null) {
          this.setState({ following: [...data.connections] });
        }
      });
  }

  /*Gets Followers for the Followers List*/
  getFollowers() {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/deldev/api/connectioncontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "getConnections",
          connectuserid: this.props.match.params.userID,
          connectionstatus: "Active",
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.connections != null) {
          this.setState({ followers: [...data.connections] });
        }
      });
  }

  /*Checks if user is blocked*/
  checkBlocked() {
    fetch("http://stark.cse.buffalo.edu/cse410/deldev/api/gmcontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getGroupMembers",
        userid: this.props.match.params.userID,
        groupid: sessionStorage.getItem("blocked_groupID"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.group_members !== undefined) {
          this.setState({ blocked: true });
        }
      });
  }

  /*Creates a Blocked Users List*/
  blockedList() {
    fetch(
      "http://stark.cse.buffalo.edu/cse410/deldev/api/groupcontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "getGroups",
          user_id: sessionStorage.getItem("userID"),
          grouptype: "blocked",
        }),
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response.groups !== undefined) {
          sessionStorage.setItem(
            "blocked_groupID",
            response.groups[0].group_id /*should [0] be [1]?*/
          );
        } else {
          fetch(
            "http://stark.cse.buffalo.edu/cse410/deldev/api/groupcontroller.php",
            {
              method: "post",
              body: JSON.stringify({
                action: "addOrEditGroups",
                user_id: sessionStorage.getItem("userID"),
                userid: sessionStorage.getItem("userID"),
                session_token: sessionStorage.getItem("token"),
                groupname:
                  "TestBlockList_1.0" + sessionStorage.getItem("userID"),
                grouptype: "blocked",
              }),
            }
          )
            .then((res) => res.json())
            .then((response) => {
              sessionStorage.setItem("blocked_groupID", response["Record Id"]);
            });
        }
      });
  }

  /*Adds a User to the Blocked List*/
  addToBlockedList(userToBlock) {
    // console.log("block clicked");
    // console.log(userToBlock);
    var isBlocked = false;
    console.log(isBlocked);
    if (!isBlocked) {
      fetch("http://stark.cse.buffalo.edu/cse410/deldev/api/gmcontroller.php", {
        method: "post",
        body: JSON.stringify({
          action: "addOrEditGroupMembers",
          user_id: sessionStorage.getItem("userID"),
          session_token: sessionStorage.getItem("token"),
          groupid: sessionStorage.getItem("blocked_groupID"),
          userid: userToBlock,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          if (response["Record Id"] !== undefined) {
            console.log("done");
            this.setState({ blocked: true });
            this.unfollow();
            // window.location.reload();
          }
        });
    }
  }

  updateFollowed() {
    this._getFollowStatus = fetch(
      "http://stark.cse.buffalo.edu/cse410/deldev/api/connectioncontroller.php",
      {
        method: "post",
        body: JSON.stringify({
          action: "getConnections",
          user_id: sessionStorage.getItem("userID"),
          userid: sessionStorage.getItem("userID"),
          connectuserid: this.props.match.params.userID,
          connectiontype: "Follow",
          //connectionstatus: 'Active',
          session_token: sessionStorage.getItem("token"),
        }),
      }
    )
      .then((res) => res.json())
      .then((response) => {
        this._getFollowStatus = null;
        this.setState({
          currentlyFollowed: response.connections?.some(
            (connection) => connection.connection_type === "Follow"
          ),
          connectionID: response.connections?.find(
            (connection) => connection.connection_type === "Follow"
          )?.connection_id,
          loadingFollowStatus: false,
        });
      });
  }

  /*implements unfollow into blocking*/

  unfollow() {
    //What I added
    if (this.state.currentlyFollowed === true) {
      fetch("http://stark.cse.buffalo.edu/cse410/deldev/api/gmcontroller.php", {
        method: "post",
        body: JSON.stringify({
          action: "getGroupMembers",
          groupid: sessionStorage.getItem("groupID"),
          membertype: sessionStorage.getItem("userID"),
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          fetch(
            "http://stark.cse.buffalo.edu/cse410/deldev/api/gmcontroller.php",
            {
              method: "post",
              body: JSON.stringify({
                action: "deleteGroupMembers",
                user_id: sessionStorage.getItem("userID"),
                session_token: sessionStorage.getItem("token"),
                gmid: response.group_members
                  ? response.group_members[0].gm_id
                  : undefined,
              }),
            }
          );
        });
    }
    if (this.state.currentlyFollowed) {
      fetch(
        "http://stark.cse.buffalo.edu/cse410/deldev/api/connectioncontroller.php",
        {
          method: "post",
          body: JSON.stringify({
            action: "deleteConnections",
            user_id: sessionStorage.getItem("userID"),
            connectionid: this.state.connectionID,
            session_token: sessionStorage.getItem("token"),
          }),
        }
      )
        .then((res) => res.json())
        .then((response) => {
          if (response.Status.startsWith("SUCCESS"))
            this.setState({ currentlyFollowed: false });
        });
    }
  }

  /*Adds a User to the Blocked List*/
  deleteFromBlockedList() {
    var useriD = this.props.match.params.userID;
    let currentComponent = this;
    fetch("http://stark.cse.buffalo.edu/cse410/deldev/api/gmcontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getGroupMembers",
        userid: useriD,
        groupid: sessionStorage.getItem("blocked_groupID"),
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        var groupList = response.group_members;
        groupList.forEach(function (value) {
          if (value.user_id === useriD) {
            fetch(
              "http://stark.cse.buffalo.edu/cse410/deldev/api/gmcontroller.php",
              {
                method: "post",
                body: JSON.stringify({
                  action: "deleteGroupMembers",
                  user_id: sessionStorage.getItem("userID"),
                  session_token: sessionStorage.getItem("token"),
                  gmid: value.gm_id,
                }),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                if (data.Exception === undefined) {
                  currentComponent.setState({ blocked: false });
                  // window.location.reload();
                }
              });
          }
        });
      });
  }

  /*Gets the Profile Picture*/
  fetchProfilePic() {
    fetch("http://stark.cse.buffalo.edu/cse410/deldev/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getUserArtifacts",
        userid: this.props.match.params.userID,
        posttype: "Recipe",
        artifacttype: "profilePic",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Got response");
        if (response.user_artifacts !== undefined) {
          console.log("Exists");
          this.setState({
            picID: response.user_artifacts[0].artifact_id,
            profileImageTemp: response.user_artifacts[0].artifact_url.replace(/^\/static/, 'static'),
            profileImage: response.user_artifacts[0].artifact_url.replace(/^\/static/, 'static'),
          });
        } else {
          fetch(
            "http://stark.cse.buffalo.edu/cse410/deldev/api/uacontroller.php",
            {
              method: "post",
              body: JSON.stringify({
                action: "addOrEditUserArtifacts",
                userid: this.props.match.params.userID,
                user_id: this.props.match.params.userID,
                session_token: sessionStorage.getItem("token"),
                artifacturl: avatar,
                artifactcategory: "image",
                artifacttype: "profilePic",
              }),
            }
          )
            .then((res) => res.json())
            .then((response) => {
              this.setState({ picID: response["Record Id"] });
            });
        }
      });
  }

  /* Edits Pfp*/

  showPopUp = () => {
    this.setState({ hidden: false });
  };

  changePic = (event) => {
    this.setState({ profileImageTemp: event.target.value });
  };

  savePic = (event) => {
    this.setState({ profileImage: this.state.profileImageTemp });
    fetch("http://stark.cse.buffalo.edu/cse410/deldev/api/uacontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "addOrEditUserArtifacts",
        userid: sessionStorage.getItem("userID"),
        user_id: sessionStorage.getItem("userID"),
        artifactid: this.state.picID !== 0 ? this.state.picID : null,
        session_token: sessionStorage.getItem("token"),
        artifacturl: this.state.profileImageTemp,
        artifactcategory: "image",
        artifacttype: "profilePic",
      }),
    });
  };

  /*Updates the page*/
  componentDidMount() {
    this.updateFollowed();
    this.getFollowing();
    this.getFollowers();
    this.fetchProfilePic();
    this.blockedList();
    this.checkBlocked();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userID !== prevProps.match.params.userID) {
      this.setState({
        posts: [],
        hidden: true,
        picID: 0,
        profileImageTemp: avatar,
        profileImage: avatar,
        followers: [],
        following: [],
      });
      this.setState({ loadingFollowStatus: true });
      this.updateFollowed();
      this.getFollowing();
      this.getFollowers();
      this.fetchProfilePic();
      this.blockedList();
      this.checkBlocked();
    }
  }

  /*********************************RENDER_FUNCTIONS*********************************/

  render() {
    let myUserId = sessionStorage.getItem("userID");
    let userID = this.props.match.params.userID;

    /*Following List*/
    var list = [];
    var i = 0;
    if (this.state.following.length != 0) {
      this.state.following.forEach((element) => {
        list.push(
          <Link to={`/user/${element.connect_user_id}`}>
            <button className="follow" key={i}>
              <Link to={`/user/${element.connect_user_id}`}>
                {`User ${element.connect_user_id}`}
              </Link>
              <FontAwesomeIcon
                icon={faEllipsisV}
                className="btn-setting"
              ></FontAwesomeIcon>
            </button>
          </Link>
        );
        i += 1;
      });
    } else {
      list.push(<div className="lonely"> Not Following Anyone Yet! </div>);
    }

    /*Followers List*/
    var list2 = [];
    var j = 0;
    if (this.state.followers.length != 0) {
      this.state.followers.forEach((element) => {
        list2.push(
          <Link to={`/user/${element.user_id}`}>
            <button className="follow" key={j}>
              <Link to={`/user/${element.user_id}`}>
                {" "}
                {`User ${element.user_id}`}
              </Link>
              <FontAwesomeIcon
                icon={faEllipsisV}
                className="btn-setting"
              ></FontAwesomeIcon>
            </button>
          </Link>
        );
        j += 1;
      });
    } else {
      list2.push(<div className="lonely2"> No Followers Yet! </div>);
    }

    /*Edit Pfp Button*/
    function EditProfilePicture(props) {
      if (myUserId === userID) {
        return (
          <div>
            <button className="changePicButton" onClick={props.handler}>
              <FontAwesomeIcon
                icon={faEdit}
                size="1x"
                // onClick={AccountSettings}
                color="black"
              ></FontAwesomeIcon>
            </button>
          </div>
        );
      }
      return null;
    }

    /*Edit Bio Button*/
    function EditBioButton() {
      if (myUserId === userID) {
        return (
          <Link to="/settings" className="editBio">
            <FontAwesomeIcon
              icon={faEdit}
              size="1x"
              // onClick={AccountSettings}
              color="black"
            ></FontAwesomeIcon>
          </Link>
        );
      }
      return null;
    }

    /*New Post Button*/
    function NewPost() {
      if (myUserId === userID) {
        return (
          <Link to="/recipe/create">
            <div className="card">
              <h2 className="newpostHeader"> New Post</h2>
              <FontAwesomeIcon
                icon={faPlus}
                size="2x"
                color="black"
              ></FontAwesomeIcon>
            </div>
          </Link>
        );
      }
      return null;
    }

    /*Settings Button*/
    function Settings() {
      if (userID === myUserId) {
        return (
          <Link to="/settings" className="settings">
            <FontAwesomeIcon
              icon={faCog}
              size="lg"
              // onClick={AccountSettings}
              color="black"
            ></FontAwesomeIcon>
          </Link>
        );
      }
      return null;
    }

    // /*Adds a User to the Blocked List*/

    var retValue =
      this.state.blocked && userID !== myUserId ? (
        <div className="card profile">
          <img
            className="profile-image"
            src={this.state.profileImage}
            alt="Avatar"
          />
          <EditProfilePicture handler={this.showPopUp} />
          <h1 className="profile-name">User {userID}</h1>
          <button onClick={() => this.deleteFromBlockedList()}>Unblock</button>
          <Settings />
        </div>
      ) : (
        <main>
          <div
            className="popUpBackground"
            style={{ display: this.state.hidden ? "none" : "flex" }}
          >
            <div className="popUpWindow">
              <button
                className="exitButton"
                onClick={() => this.setState({ hidden: true })}
              >
                +
              </button>
              <h2>Change Profile Picture</h2>
              <input
                type="text"
                placeholder="Paste Image URL"
                onChange={this.changePic}
              ></input>
              <img
                id="image"
                className="profile-image-large"
                src={this.state.profileImageTemp}
                alt=""
              />
              <button onClick={this.savePic}>Save Changes</button>
            </div>
          </div>

          <div className="card profile">
            <img
              className="profile-image"
              src={this.state.profileImage}
              alt="Avatar"
            />
            <EditProfilePicture handler={this.showPopUp} />
            <h1 className="profile-name">User {userID}</h1>
            {userID !== myUserId ? <FollowButton userID={userID} /> : null}
            {userID !== myUserId ? (
              <button onClick={() => this.addToBlockedList(userID)}>
                Block
              </button>
            ) : null}

            <Settings />
          </div>

          <div className="feed">
            <div className="card sidebar">
              <div className="BioRow">
                <h1 className="left-text"> Bio </h1>
                <EditBioButton />
              </div>

              <p className="left-text">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>

              <div className="followRow">
                <h1 className="left-text" id="followers">
                  Following
                </h1>
                <h2 className="following-count">
                  ({this.state.following.length})
                </h2>
              </div>
              {list}

              <div className="followRow">
                <h1 className="left-text" id="followers">
                  Followers
                </h1>
                <h2 className="following-count">
                  ({this.state.followers.length})
                </h2>
              </div>
              {list2}
            </div>

            <div className="profileFeed">
              <NewPost />
              <PostList
                fetchParams={{
                  action: "getPosts",
                  posttype: 'Recipe',
                  userid: this.props.match.params.userID,
                }}
              />
            </div>
          </div>
        </main>
      );

    return retValue;
  }
}

export default withRouter(Profile);
