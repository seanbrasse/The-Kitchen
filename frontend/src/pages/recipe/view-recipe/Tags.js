import React from 'react';
import PropTypes from 'prop-types';
import "./RecipePage.css"


const Tags = (props) => {
  var tags = props.tags ? props.tags : null;
  var firstTag;

  if(tags){

    if(tags.length == 1){
      return(
        <div>
          <p>{tags[0]}</p>
        </div>
      )
    }else{
      firstTag = tags[0];
      tags = tags.slice(1);
      return(
        <div>
          <p>{firstTag}{tags.map((t, i) => ", " + t)}</p>
        </div>
      )
    }

  }else{
    return(<p></p>)
  }
}

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
}

export default Tags;
