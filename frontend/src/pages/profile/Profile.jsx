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
import ProfileList from "./ProfileList";
// import AccountSettings from './../account-settings/AccountSettings';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.updatePageData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userID !== prevProps.match.params.userID) {
      this.updatePageData();
    }
  }

  updatePageData() {
    this.setState({ posts: [] });
    fetch("http://stark.cse.buffalo.edu/cse410/deldev/api/postcontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getPosts",
        userid: this.props.match.params.userID,
        posttype: "Recipe",
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          posts: response.posts ? response.posts : [],
        });
      });
  }

  render() {
    let myUserId = sessionStorage.getItem("userID");
    let userID = this.props.match.params.userID;
    let delete_val = myUserId == userID;
   
    const followers = [];
    //var followerState = true;
    for (var i = 0; i <= 5; i++) {
      followers.push(
        <button className="follower" key={i}>
          Follower
          <FontAwesomeIcon
            icon={faEllipsisV}
            className="btn-setting"
          ></FontAwesomeIcon>
        </button>
      );
    }

    function EditProfilePicture() {
      if (myUserId === userID) {
        return (
          <Link to="/settings" className="editPfp">
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

    return (
      <main>
        <div className="card profile">
          <img className="profile-image" src={avatar} alt="Avatar" />
          <EditProfilePicture />
          {/* {console.log("myUserId: " + myUserId)} */}
          {/* {console.log("userID: " + userID)} */}
          <h1 className="profile-name">{userID}</h1>
          {userID !== myUserId ? <FollowButton userID={userID} /> : null}
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
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>

            <div className="followersRow">
              <h1 className="left-text" id="followers">
                Followers
              </h1>
            </div>
            {followers}
          </div>
          <div className="profileFeed">
            <NewPost />
            <ProfileList posts={this.state.posts} delete={delete_val} />
          </div>
        </div>
      </main>
    );
  }
}

export default withRouter(Profile);
