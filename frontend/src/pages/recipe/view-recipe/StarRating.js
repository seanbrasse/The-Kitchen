
import React from 'react';
//import PropTypes from 'prop-types';
//import { MdStar } from 'react-icons/md';
import "./RecipePage.css";


const StarRating = (props) => {
  var stars = [1, 2, 3, 4, 5]

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
