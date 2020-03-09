import React from 'react';
import PropTypes from 'prop-types';
import "./RecipePage.css"


const Author = (props) => {
  return(
    <div id="sideByside">
    <img id="profileImage" src={process.env.PUBLIC_URL + props.profileImage}/>
    <p>{props.username}</p>
    </div>
  )
}

Author.propTypes = {
  profileImage: PropTypes.string,
  username: PropTypes.string
}

export default Author;
