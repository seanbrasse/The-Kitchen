import React from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import FollowButton from "./FollowButton/FollowButton";
import AccountSettings from "../account-settings/AccountSettings";
import "./Profile.css";
import avatar from "./img_avatar.png";

export default function Profile() {
  let { userID } = useParams();

  const followers = [];
  var followerState = true;
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

  //Checks if we are viewing the user's profile or someone else's
  var myid = false; 
  function myProfile(userID) {
    if (userID == Response.user.user_id){
        myid = true;
    }
    return myid;
    
  }

  function changeToFollowing(followerList) {
    var text = followerState ? "Follower" : "Following";
    var replace = followerState ? "Following" : "Follower";
    for (var i = 0; i < followerList.length; i++) {
      followerList[i].innerHTML = followerList[i].innerHTML.replace(
        replace,
        text
      );
    }
  }

  function followingButton(e) {
    e.preventDefault();
    var followerList = document.getElementsByClassName("follower");
    if (!followerState) {
      followerState = true;
      document.getElementById("followers").innerText = "Followers";
    } else {
      followerState = false;
      document.getElementById("followers").innerText = "Following";
    }
    changeToFollowing(followerList);
  }

  //Unsure how to do conditional statements currently
  if(!myid){
  return (
    <main>
      <div className="profile">
          <img className="profile-image" src={avatar} alt="Avatar" /> 
          <Link to="/settings" className="editPfp">
            <FontAwesomeIcon
              icon={faEdit}
              size="1x"
              onClick={AccountSettings}
              color="black"
            ></FontAwesomeIcon>
          </Link>
        
        
        <h1 className="profile-name">{userID}</h1>
        <FollowButton userID={userID} />
        
        <Link to="/settings" className="settings">
          <FontAwesomeIcon
            icon={faCog}
            size="lg"
            onClick={AccountSettings}
            color="black"
          ></FontAwesomeIcon>
        </Link>
        
        
      </div>
      <div className="sidebar">
        <div className="BioRow">
          <h1 className="left-text">Bio</h1>
          
          <Link to="/settings" className="editBio">
            <FontAwesomeIcon
              icon={faEdit}
              size="1x"
              onClick={AccountSettings}
              color="black"
            ></FontAwesomeIcon>
          </Link>
        
        </div>
        <p className="left-text">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>

        <div className="followersRow">
          <h1 className="left-text" id="followers">
            Followers
          </h1>
          <FontAwesomeIcon
            className="Following"
            icon={faCaretDown}
            size="2x"
            color="black"
            onClick={followingButton}
          ></FontAwesomeIcon>
        </div>
        {followers}
      </div>

      <div className="my-feed">
        <h1 className="recipe">Recipe</h1>
        <p className="recipe-text">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </div>
    </main>
  );
  
    } else{
    return (
      <main>
        <div className="profile">
          {
            <img className="profile-image" src={avatar} alt="Avatar" /> 
          }
          <Link to="/settings" className="editPfp">
            <FontAwesomeIcon
              icon={faEdit}
              size="1x"
              onClick={AccountSettings}
              color="black"
            ></FontAwesomeIcon>
          </Link>


          <h1 className="profile-name">Profile {userID}</h1>
          <FollowButton userID={userID} />

          <Link to="/settings" className="settings">
            <FontAwesomeIcon
              icon={faCog}
              size="lg"
              onClick={AccountSettings}
              color="black"
            ></FontAwesomeIcon>
          </Link>


        </div>
        <div className="sidebar">
          <div className="BioRow">
            <h1 className="left-text">Bio</h1>

            <Link to="/settings" className="editBio">
              <FontAwesomeIcon
                icon={faEdit}
                size="1x"
                onClick={AccountSettings}
                color="black"
              ></FontAwesomeIcon>
            </Link>

          </div>
          <p className="left-text">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
        </p>

          <div className="followersRow">
            <h1 className="left-text" id="followers">
              Followers
          </h1>
            <FontAwesomeIcon
              className="Following"
              icon={faCaretDown}
              size="2x"
              color="black"
              onClick={followingButton}
            ></FontAwesomeIcon>
          </div>
          {followers}
        </div>

        <div className="my-feed">
          <h1 className="recipe">Recipe</h1>
          <p className="recipe-text">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
        </p>
        </div>
      </main>
    );
      }
  } 

