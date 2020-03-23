import React from 'react';
import PropTypes from 'prop-types';
import "./RecipePage.css"

const Description = (props) => {
  if(props.type == "edit"){
    return(
      <div>
      <textarea name="description" value={props.description} onChange={props.handle}></textarea>
      </div>
    )
  }else{
    return(
      <div>
      <p>{props.description}</p>
      </div>
    )
  }
}

Description.propTypes = {
  handle: PropTypes.func,
  type: PropTypes.oneOf("edit", "display"),
  description: PropTypes.string
}

export default Description;
