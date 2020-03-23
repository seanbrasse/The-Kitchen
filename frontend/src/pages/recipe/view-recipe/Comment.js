import React from 'react';
import PropTypes from 'prop-types';
import "./RecipePage.css"


const Comment = (props) => {
  if(props.type === "display"){
    return(
      <div>
      <div id="sideByside">
        <img id="profileImage" src={process.env.PUBLIC_URL + props.profileImage}/>
      </div>
      <div id="sideByside">
        <p>{props.username}</p>
        <p>{props.comment}</p>
      </div>
      </div>
    )
  }else{
    return(
      <div>
      <div id="sideByside">
        <img id="profileImage" src={process.env.PUBLIC_URL + props.profileImage}/>
      </div>
      <div id="sideByside">
        <p>{props.username}</p>
        <input type='text' onChange={props.handleTextbox}></input>
      	<button onClick={props.handleButton}>"Post Comment"</button>
      </div>
      </div>
    )
  }
}

Comment.propTypes = {
  type: PropTypes.oneOf(["display", "post"]),
  profileImage: PropTypes.string,
  username: PropTypes.string,
  comment: PropTypes.string,
  handleTextbox: PropTypes.func,
  handleButton: PropTypes.func
}

export default Comment;
