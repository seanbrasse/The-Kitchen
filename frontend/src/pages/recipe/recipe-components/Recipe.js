import React from 'react';
import PropTypes from 'prop-types';
import { MdDelete } from 'react-icons/md';
import placeHolderImg from "./placeHolderImg.png";
import './recipe.css';


const Recipe = (props) => {
  if(props.type === "edit"){
    return(
      <div className="recipe">
      {props.recipe[1].map((e, i) => <EditElem key={i} index={i} type={props.recipe[0][i]} value={e} handle={props.handle}/>)}
      </div>
    )
  }else{
    return(
      <div className="recipe">
      {props.recipe[1].map((e, i) => <GetElem key={i} elem={e} type={props.recipe[0][i]} />)}
      </div>
    )
  }
}

const GetElem = (props) => {
  if(props.type === "header"){
    return(<h4>{props.elem}</h4>)
  }else if (props.type === "text") {
    return(<p>{props.elem}</p>)
  }else{
    return(<img src={props.elem} alt="Recipe Image"/>)
  }
}

const EditElem = (props) => {
  if(props.type === "header"){
  return(<div>
            <input type="text" name="update" placeholder="Step" value={props.value} onChange={(e) => props.handle(e, props.index)}></input>
            <button className="icon" name="Delete" onClick={(e) => props.handle(e, props.index)} aria-label="Close"><MdDelete/></button>
          </div>)
  }else if (props.type === "text") {
    return(<div>
            <textarea name="update" placeholder="Write step here" value={props.value} onChange={(e) => props.handle(e, props.index)}></textarea>
          </div>)
  }else{
    return(<div>
            <label for="textbox">Image URL</label>
            <button className="icon" name="Delete" onClick={(e) => props.handle(e, props.index)} aria-label="Close"><MdDelete/></button><br></br>
            <input type="text" placeholder="Paste Image or URL" name="update" value={props.value} onChange={(e) => props.handle(e, props.index)}></input><br></br>
            <img src={props.value} alt=""/>
          </div>)
  }
}

Recipe.propTypes = {
  handle: PropTypes.func,
  type: PropTypes.oneOf(["edit", "display"]),
  recipe: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
}

export default Recipe;
