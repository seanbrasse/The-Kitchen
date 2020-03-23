import React from 'react';
import PropTypes from 'prop-types';
import "./RecipePage.css"

const IngredientsList = (props) => {
  if(props.type === "edit"){
    return(
      <div>
        <div>
          <div id="sideByside">
            <h2>Ingredients</h2>
            <ul>
            <li><input type="text" name="Ingredients" onChange={props.handle}></input></li>
            {props.ingredients[0].map((a, i) => <li><input type="text" name="Ingredients" onChange={props.handle}></input></li>)}
            </ul>
          </div>
          <div id="sideByside">
            <h2>Amount</h2>
            <ul>
            <li><input type="number" name="Amount" onChange={props.handle}></input></li>
            {props.ingredients[0].map((a, i) => <li><input type="number" name="Amount" onChange={props.handle}></input></li>)}
            </ul>
          </div>
          <div id="sideByside">
            <h2>Units</h2>
            <ul>
            <li><input type="text" name="Units" onChange={props.handle}></input></li>
            {props.ingredients[0].map((a, i) => <li><input type="text" name="Units" onChange={props.handle}></input></li>)}
            </ul>
          </div>
        </div>
      </div>
    )
  }else{
    return(
      <div>
        <div id="sideByside">
          <h2>Ingredients</h2>
          <ul>{props.ingredients[0].map(ing => <li><input type="checkbox"></input> {ing} </li>)}</ul>
        </div>
        <div id="sideByside">
          <h2>Amount</h2>
          <ul>{props.ingredients[1].map((a, i) => <li>{a} {props.ingredients[2][i]}</li>)}</ul>
        </div>
      </div>
    )
  }
}

IngredientsList.propTypes = {
  handle: PropTypes.func,
  type: PropTypes.oneOf("edit", "display"),
  ingredients: PropTypes.arrayOf([PropTypes.arrayOf(PropTypes.string),
                                  PropTypes.arrayOf(PropTypes.number),
                                  PropTypes.arrayOf(PropTypes.string)])
}

export default IngredientsList;
