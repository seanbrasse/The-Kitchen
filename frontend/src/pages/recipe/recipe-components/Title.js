import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit
} from "@fortawesome/free-solid-svg-icons";
import './recipe.css';

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
                ></FontAwesomeIcon>
            </Link></Fragment> : null
        }
      </h1>
      <img src={props.image} alt="Recipe dish"/>
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
