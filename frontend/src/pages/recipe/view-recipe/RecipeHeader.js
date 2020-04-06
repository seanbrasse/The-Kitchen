import React from 'react';
import PropTypes from 'prop-types';
import "./RecipePage.css"


const RecipeHeader = (props) => {
  var buttons = props.buttons ? props.buttons : null;

  if(buttons && props.type === "edit"){
    return(
      <div>
        <h1>{props.children}{props.buttons.map((b, i) => <button name={i} onClick={props.handle}>{b}</button>)}</h1>
      </div>
    )
  }else{
    return(
      <div>
        <h1>{props.children}</h1>
      </div>
    )
  }
}

RecipeHeader.propTypes = {
  type: PropTypes.oneOf("edit", "display"),
  buttons: PropTypes.arrayOf(PropTypes.string),
  handle: PropTypes.func,
  children: PropTypes.element.isRequired
}

export default RecipeHeader;
