import React from "react";
import "./comment.css";
import PostingList from "./PostingList.js";
import Comment from "./comment.js"
export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post_text: "",
      postmessage: ""
    };
    this.postListing = React.createRef();
  }

  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the authentication page
    fetch("http://stark.cse.buffalo.edu/cse410/deldev/api/postcontroller.php", {
      
      method: "post",
      body: JSON.stringify({
        action: "addOrEditPosts",
        user_id: sessionStorage.getItem("userID"),
        session_token: sessionStorage.getItem("token"),
        posttext: this.state.post_text
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            postmessage: result.Status
          });
          this.postListing.current.loadPosts();
        },
        error => {
          alert("error!");
        }
      );
  };

  myChangeHandler = event => {
    this.setState({
      post_text: event.target.value
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <label>
          Add A Comment to the Recipe!
            <br />
            <textarea rows="10" cols="70" onChange={this.myChangeHandler} />
          </label>
          <br />

          <input type="submit" value="submit" />
          <br />
          {this.state.postmessage}
        </form>
        <PostingList ref={this.postListing}  parentid={this.props.parent} type="postlist"/>
       

      </div>
    );
  }
}