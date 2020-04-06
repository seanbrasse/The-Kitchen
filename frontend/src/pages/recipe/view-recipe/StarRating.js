
import React from 'react';
//import PropTypes from 'prop-types';
//import { MdStar } from 'react-icons/md';
import "./RecipePage.css";


const StarRating = (props) => {
  var stars = []

  return(
    <div>
      {stars.map((r) =>
        <label>
        <input type="radio" name="stars" value={r} onClick={props.updateRating}></input>
        [Star]
        </label>
      )}
      <p>{props.newRating}</p>
    </div>
  )
}

export default StarRating;
