import React from 'react';
import PropTypes from 'prop-types';
import "./RecipePage.css"


const PrepTime = (props) => {
  return(
    <p>Prep Time: {props.time} {props.units}</p>
  )
}

PrepTime.propTypes = {
  time: PropTypes.number,
  units: PropTypes.string
}

export default PrepTime;
