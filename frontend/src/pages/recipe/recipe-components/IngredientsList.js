import React from 'react';
import PropTypes from 'prop-types';
import { MdDelete } from 'react-icons/md';
import styles from './recipe.css';

const IngredientsList = (props) => {
  if(props.type === "edit"){
    return(
      <div class="ingredients">
          <div>
            <h2>Ingredients</h2>
            <ul>
            {props.ingredients[0].map((ing, i) => <li key={i}>
            <input type="text" name="Ingredients" value={ing} onChange={(e) => props.handle(e, i)}>
            </input></li>)}
            </ul>
          </div>
          <div>
            <h2>Amount</h2>
            <ul>
            {props.ingredients[1].map((amt, i) => <li key={i}>
            <input type="number" name="Amount" value={amt} onChange={(e) => props.handle(e, i)}></input></li>)}
            </ul>
          </div>
          <div>
            <h2>Units</h2>
            <ul>
            {props.ingredients[2].map((unit, i) => <li key={i}>
              <input type="text" name="Units" value={unit} onChange={(e) => props.handle(e, i)}></input>
              <button className="icon" name="Delete" onClick={(e) => props.handle(e, i)}><MdDelete/></button>
              </li>)}
            </ul>
            <button class="smallButton" name="button" onClick={(e) => props.handle(e, 0)}>Add Ingredient</button>
          </div>
      </div>
    )
  }else{
    return(
      <div class="ingredients">
        <div>
          <h2>Ingredients</h2>
          <ul>{props.ingredients[0].map((ing, i) => <li key={i}><input id="autoWidth" type="checkbox"></input> {ing} </li>)}</ul>
        </div>
        <div>
          <h2>Amount</h2>
          <ul>{props.ingredients[1].map((a, i) => <li key={i}>{a} {props.ingredients[2][i]}</li>)}</ul>
        </div>
      </div>
    )
  }
}

IngredientsList.propTypes = {
  handle: PropTypes.func,
  type: PropTypes.oneOf(["edit", "display"]),
  ingredients: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
}

export default IngredientsList;
