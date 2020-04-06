import React from 'react';
import PropTypes from 'prop-types';

const Description = (props) => {
  if(props.type === "edit"){
    return(
      <div class="description">
      <textarea name="description" value={props.description} onChange={props.handle}></textarea>
      </div>
    )
  }else{
    return(
      <div class="description">
      <p>{props.description}</p>
      </div>
    )
  }
}

Description.propTypes = {
  handle: PropTypes.func,
  type: PropTypes.oneOf(["edit", "display"]),
  description: PropTypes.string
}

export default Description;
