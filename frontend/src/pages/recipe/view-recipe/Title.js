import React from 'react';
import PropTypes from 'prop-types';
import "./RecipePage.css"

const Title = (props) => {
  if(props.type == "edit"){
    return(
      <div>
      <div><input type="text" name="title" onChange={props.handle}></input></div>
      <div><input type="text" name="image" onChange={props.handle}></input></div>
      </div>
    )
  }else{
    return(
      <div>
      <h1>{props.title}</h1>
      <img src={process.env.PUBLIC_URL + props.image}/>
      </div>
    )
  }
}

Title.propTypes = {
  handle: PropTypes.func,
  type: PropTypes.oneOf("edit", "display"),
  title: PropTypes.string,
  image: PropTypes.string
}

export default Title;
