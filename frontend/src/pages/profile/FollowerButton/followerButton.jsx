import React from "react";
import { Link } from "react-router-dom";
import styles from "./followerButton.module.css";
import FollowButton from './../FollowButton/FollowButton';

export default class followerButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
      
        }
    }


  render (){

    let userID = this.props.match.params.userID;

    function followButton(){
      <button className = "follower">
        <button className="follower" key={i}>
          {userID}
          <FontAwesomeIcon
            icon={faEllipsisV}
            className="btn-setting"
          ></FontAwesomeIcon>
        </button>
        </button>
    }

    function getFollowers(){
      

    }
      return(

        {FollowButton}

      );
  }  

}



