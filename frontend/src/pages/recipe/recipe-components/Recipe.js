import React from 'react';
import PropTypes from 'prop-types';
import { MdDelete } from 'react-icons/md';
import styles from './recipe.css';


const Recipe = (props) => {
  if(props.type === "edit"){
    return(
      <div class="recipe">
      {props.recipe[1].map((e, i) => <EditElem key={i} index={i} type={props.recipe[0][i]} value={e} handle={props.handle}/>)}
      </div>
    )
  }else{
    return(
      <div class="recipe">
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
    return(<img src={props.elem}/>)
  }
}

const EditElem = (props) => {
  if(props.type === "header"){
  return(<div>
            <button className="icon" name="Delete" onClick={(e) => props.handle(e, props.index)}><MdDelete/></button>
            <label for="textbox">Header</label><br></br>
            <input type="text" name="update" value={props.value} onChange={(e) => props.handle(e, props.index)}></input>
          </div>)
  }else if (props.type === "text") {
    return(<div>
            <button className="icon" name="Delete" onClick={(e) => props.handle(e, props.index)}><MdDelete/></button>
            <label for="textbox">Description</label><br></br>
            <textarea name="update" value={props.value} onChange={(e) => props.handle(e, props.index)}></textarea>
          </div>)
  }else{
    return(<div>
            <button className="icon" name="Delete" onClick={(e) => props.handle(e, props.index)}><MdDelete/></button>
            <label for="textbox">Image URL</label><br></br>
            <input type="text" name="update" value={props.value} onChange={(e) => props.handle(e, props.index)}></input>
            <img src={props.value}/>
          </div>)
  }
}

Recipe.propTypes = {
  handle: PropTypes.func,
  type: PropTypes.oneOf(["edit", "display"]),
  recipe: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
}

export default Recipe;
