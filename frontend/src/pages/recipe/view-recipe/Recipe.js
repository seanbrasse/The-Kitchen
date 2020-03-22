import React from 'react';
import PropTypes from 'prop-types';
import "./RecipePage.css"


const Recipe = (props) => {
  if(props.type == "edit"){
    return(
      <div>
      {props.recipe[1].map((e, i) => <EditElem index={i} type={props.recipe[0][i]} handle={props.handle}/>)}
      </div>
    )
  }else{
    return(
      <div>
      {props.recipe[1].map((e, i) => <GetElem elem={e} type={props.recipe[0][i]} />)}
      </div>
    )
  }
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

const EditElem = (props) => {
  if(props.type == "header"){
    return(<div><input type="text" name={props.index} onChange={props.handle}></input></div>)
  }else if (props.type == "text") {
    return(<div><textarea name={props.index} onChange={props.handle}></textarea></div>)
  }else{
    return(<div><input type="text" name={props.index} onChange={props.handle}></input></div>)
  }
}

Recipe.propTypes = {
  handle: PropTypes.func,
  type: PropTypes.oneOf("edit", "display"),
  recipe: PropTypes.arrayOf([PropTypes.arrayOf(PropTypes.string),
                             PropTypes.arrayOf(PropTypes.oneOf(["header", "text", "image"]))])
}

export default Recipe;
