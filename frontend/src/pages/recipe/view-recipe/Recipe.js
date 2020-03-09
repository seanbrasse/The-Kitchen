import React from 'react';
import PropTypes from 'prop-types';
import "./RecipePage.css"


const Recipe = (props) => {
  return(
    <div>
    {props.elements.map((e, i) => <GetElem elem={e} type={props.types[i]}/>)}
    </div>
  )
}

const GetElem = (props) => {
  if(props.type == "header"){
    return(<h4>{props.elem}</h4>)
  }else if (props.type == "text") {
    return(<p>{props.elem}</p>)
  }else{
    return(<img src={process.env.PUBLIC_URL + props.elem}/>)
  }
}


Recipe.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.string),
  types: PropTypes.arrayOf(PropTypes.oneOf(["header", "text", "image"]))
}

export default Recipe;
