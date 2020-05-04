import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit, faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import './recipe.css';

function deletePost(postID) {
  fetch("http://stark.cse.buffalo.edu/cse410/deldev/api/postcontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "deletePosts",
        postid: postID,
        user_id: sessionStorage.getItem("userID"),
        session_token: sessionStorage.getItem("token"),
      }),
    }
  ).then((res) => res.json()).then((response) => {
      if (response.Exception == null) {
        window.location.hash = '';
      }
  });
}

const Title = (props) => {
  if(props.type === "edit"){
    return(
      <div className="title">
      <div>
        <label htmlFor="textbox">Title</label><br></br>
        <input type="text" name="title" placeholder="Title" value={props.title} onChange={props.handle}></input>
      </div>
      <div>
        <label htmlFor="textbox">Image URL</label><br></br>
        <input type="text" name="image" placeholder="Paste Image or URL" value={props.image} onChange={props.handle}></input>
      </div>
      <img src={props.image} alt=""/>
      </div>
    )
  }else{
    return(
      <div className="title">
      <h1>
        {props.title}
        {
          props.canEdit ?
            <Fragment>&nbsp;<Link to={`/recipe/${props.postID}/edit`}>
                <FontAwesomeIcon
                icon={faEdit}
                size="1x"
                color="black"
                alt="edit"
                ></FontAwesomeIcon>
            </Link>
            <FontAwesomeIcon
                icon={faTrashAlt}
                style={{cursor: 'pointer', marginLeft: '10px'}}
                onClick={() => deletePost(props.postID)}
                size="1x"
                color="black"
                alt="delete"
            />
            </Fragment> : null
        }
      </h1>
      <h2 style={{textAlign: 'center'}}>By <Link to={`/user/${props.userid}`}>{props.name}</Link></h2>
      <img src={props.image} alt="Recipe dish" style={{height: '400px', objectFit: 'cover'}}/>
      </div>
    )
  }
}

Title.propTypes = {
  handle: PropTypes.func,
  type: PropTypes.oneOf(["edit", "display"]),
  title: PropTypes.string,
  image: PropTypes.string
}

export default Title;
