import React from 'react';
import PropTypes from 'prop-types';
import "./RecipePage.css"


const IngredientsList = (props) => {
  return(
    <div>
      <div id="sideByside">
        <h2>Ingredients</h2>
        <ul>{props.ingredients.map(ing => <li><input type="checkbox"></input> {ing} </li>)}</ul>
      </div>
      <div id="sideByside">
        <h2>Amount</h2>
        <ul>{props.amount.map((a, i) => <li>{a} {props.units[i]}</li>)}</ul>
      </div>
    </div>
  )
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string),
  amount: PropTypes.arrayOf(PropTypes.number),
  units: PropTypes.arrayOf(PropTypes.string)
}

export default IngredientsList;
