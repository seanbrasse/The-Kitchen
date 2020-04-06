import React from "react";
import { useParams, Link } from "react-router-dom";
import avatar from "./img_avatar.png";
import FollowButton from "./FollowButton/FollowButton";
import {
  faEllipsisV,
  faCaretDown,
  faEdit,
  faCog,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccountSettings from "../account-settings/AccountSettings";
import "./Profile.css";
import EditRecipe from './../recipe/edit-recipe/EditRecipe';
import Recipe from './../recipe/recipe-components/Recipe';
import RecipeHeader from './../recipe/recipe-components/RecipeHeader';
import Description from './../recipe/recipe-components/Description';

export default function Profile() {
  let { userID } = useParams();
  sessionStorage.setItem("user_id", userID);
  let myUserId = sessionStorage.getItem("userID"); //just an idea for accessing my profile

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

  function EditProfilePicture() {
    if (myUserId == userID) {
      return (
        <Link to="/settings" className="editPfp">
          <FontAwesomeIcon
            icon={faEdit}
            size="1x"
            onClick={AccountSettings}
            color="black"
          ></FontAwesomeIcon>
        </Link>
      );
    } else {
      return <div />;
    }
  }

  function EditBioButton() {
    if (myUserId == userID) {
      return (
        <Link to="/settings" className="editBio">
          <FontAwesomeIcon
            icon={faEdit}
            size="1x"
            onClick={AccountSettings}
            color="black"
          ></FontAwesomeIcon>
        </Link>
      );
    } else {
      return <div></div>;
    }
  }

  function NewPost(){
    if(myUserId == userID){
      return (
        <Link to= "/recipe/create" className = "new-new">
          <FontAwesomeIcon
          icon={faPlus}
          size = "2x"
          onClick={EditRecipe}
          color="black"
          ></FontAwesomeIcon>
        </Link>
      );
    }
  }

  function EditRecipe() {
    if (myUserId == userID) {
      return (
        <Link to="/recipe/:recipeID/edit" className="editRecipe">
          <FontAwesomeIcon
            icon={faEdit}
            size="1x"
            onClick={AccountSettings}
            color="black"
          ></FontAwesomeIcon>
        </Link>
      );
    } else {
      return <div></div>;
    }
  }

  function Settings() {
    if (userID === myUserId) {
      return (
        <Link to="/settings" className="settings">
          <FontAwesomeIcon
            icon={faCog}
            size="lg"
            onClick={AccountSettings}
            color="black"
          ></FontAwesomeIcon>
        </Link>
      );
    } else {
      return <div/>;
    }
  }

  return (
    <main>
      <div className="card profile">
        <img className="profile-image" src={avatar} alt="Avatar" />
        {/* {console.log("myUserId: " + myUserId)} */}
        {/* {console.log("userID: " + userID)} */}
        <h1 className="profile-name">{userID}</h1>
        <EditProfilePicture />
        <FollowButton userID={userID} />
        <Settings />
      </div>

      <div className="feed">
        <div className="new-post">
          <h2 className="post"> New Post</h2>
          <NewPost />
          </div>

          
            <div className="recipe-box">
              <h2 className="recipe-name"> Recipe </h2>
              <image className="recipe-image">  </image>
              <EditRecipe />
              <p className="recipe-description"> Description </p>
          </div>
      <div className="card sidebar">
        <div className="BioRow">
          <h1 className="left-text"> Bio </h1>
          <EditBioButton />
        </div>

        <div className="sidebar">
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
      </div>
      </div>
    </main>
  );
}
