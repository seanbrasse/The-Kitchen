import React from 'react';
import PropTypes from 'prop-types';
import "./RecipePage.css"


const Author = (props) => {
  return(
    <div>
      <div id="sideByside">
        <img id="profileImage" src={process.env.PUBLIC_URL + props.profileImage}/>
      </div>
      <div id="sideByside">
        <p>{props.username}</p>
      </div>
    </div>
  )
}

Author.propTypes = {
  profileImage: PropTypes.string,
  username: PropTypes.string
}

export default Author;
