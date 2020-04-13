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
import {PostList} from "components";
// import AccountSettings from './../account-settings/AccountSettings';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      hidden: true,
      picID: 0,
      profileImageTemp: avatar,
      profileImage: avatar
    }
  }

  fetchProfilePic(){
    fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/uacontroller.php', {
      method: 'post',
      body: JSON.stringify({
          action: 'getUserArtifacts',
          userid: this.props.match.params.userID,
          posttype: 'Recipe',
          artifacttype: 'profilePic'
      })
    }).then(res => res.json()).then(
        response => {
            console.log("Got response");
            if(response.user_artifacts !== undefined){
              console.log("Exists");
              this.setState({
                picID: response.user_artifacts[0].artifact_id,
                profileImageTemp: response.user_artifacts[0].artifact_url,
                profileImage: response.user_artifacts[0].artifact_url
              })
            }else{
              fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/uacontroller.php', {
                method: 'post',
                body: JSON.stringify({
                    action: 'addOrEditUserArtifacts',
                    userid: this.props.match.params.userID,
                    user_id: this.props.match.params.userID,
                  	session_token: sessionStorage.getItem('token'),
                  	artifacturl: avatar,
                  	artifactcategory: "image",
                  	artifacttype: "profilePic"
                })
              }).then(res => res.json()).then(
                  response => {
                    this.setState({picID: response["Record Id"]})
                })
            }
        }
    );
  }

  showPopUp = () => {
    this.setState({hidden: false});
  }

  changePic = (event) => {
    this.setState({profileImageTemp: event.target.value});
  }

  savePic = (event) => {
    this.setState({profileImage: this.state.profileImageTemp});
    fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/uacontroller.php', {
      method: 'post',
      body: JSON.stringify({
          action: 'addOrEditUserArtifacts',
          userid: sessionStorage.getItem('userID'),
          user_id: sessionStorage.getItem('userID'),
	        artifactid: this.state.picID !== 0 ? this.state.picID : null,
          session_token: sessionStorage.getItem('token'),
          artifacturl: this.state.profileImageTemp,
          artifactcategory: "image",
          artifacttype: "profilePic"
      })
    })
  }

  componentDidMount() {
    this.fetchProfilePic();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userID !== prevProps.match.params.userID) {
      this.setState({
        posts: [],
        hidden: true,
        picID: 0,
        profileImageTemp: avatar,
        profileImage: avatar
      });
      this.fetchProfilePic();
    }
  }

  render() {
    let myUserId = sessionStorage.getItem("userID");
    let userID = this.props.match.params.userID;
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

        <div className="popUpBackground" style={{display: (this.state.hidden ? 'none' : 'flex')}}>
          <div className="popUpWindow">
          <button className="exitButton" onClick={() => this.setState({hidden: true})}>+</button>
          <h2>Change Profile Picture</h2>
          <input type="text" placeholder="Paste Image or URL" onChange={this.changePic}></input>
          <img id="image" className="profile-image-large" src={this.state.profileImageTemp} alt="Avatar"/>
          <button onClick={this.savePic}>Save Changes</button>
          </div>
        </div>

        <div className="card profile">
          <img className="profile-image" src={this.state.profileImage} alt="Avatar" />
          <EditProfilePicture handler={this.showPopUp} />
          <h1 className="profile-name">User {userID}</h1>
          {
            userID !== myUserId ? <FollowButton userID={userID} /> : (null)
          }
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
            <PostList fetchParams={{
                action: 'getPosts',
                userid: this.props.match.params.userID,
                posttype: 'Recipe'
            }}/>
          </div>
        </div>

      </main>
    );
  }
}

export default withRouter(Profile);
