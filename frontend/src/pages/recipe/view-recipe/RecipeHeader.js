import React from 'react';
import PropTypes from 'prop-types';
import "./RecipePage.css"


const RecipeHeader = (props) => {
  var buttons = props.buttons ? props.buttons : null;

  if(buttons){
    return(
      <div>
        <h1>{props.children}{props.buttons.map((b, i) => <button onClick={props.onClick[i]}>{b}</button>)}</h1>
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
  buttons: PropTypes.arrayOf(PropTypes.func),
  onClick: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.element.isRequired
}

export default RecipeHeader;
