import React from 'react';
import PropTypes from 'prop-types';
import './recipe.css';

const Title = (props) => {
  if(props.type === "edit"){
    return(
      <div class="title">
      <div>
        <label for="textbox">Title</label><br></br>
        <input type="text" name="title" value={props.title} onChange={props.handle}></input>
      </div>
      <div>
        <label for="textbox">Image URL</label><br></br>
        <input type="text" name="image" value={props.image} onChange={props.handle}></input>
      </div>
      <img src={props.image} alt="Recipe dish"/>
      </div>
    )
  }else{
    return(
      <div class="title">
      <h1>{props.title}</h1>
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
