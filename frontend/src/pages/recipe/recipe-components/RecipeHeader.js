import React from 'react';
import PropTypes from 'prop-types';
import './recipe.css';


const RecipeHeader = (props) => {
  var buttons = props.buttons ? props.buttons : null;

  if(buttons && props.type === "edit"){
    return(
      <div className="recipe-header">
        <h2>{props.children}{props.buttons.map((b, i) => <button className="largeButton" key={i} name={i} onClick={props.handle}>{b}</button>)}</h2>
      </div>
    )
  }else{
    return(
      <div className="recipe-header">
        <h2>{props.children}</h2>
      </div>
    )
  }
}

RecipeHeader.propTypes = {
  type: PropTypes.oneOf(["edit", "display"]),
  buttons: PropTypes.arrayOf(PropTypes.string),
  handle: PropTypes.func,
  children: PropTypes.string.isRequired
}

export default RecipeHeader;
