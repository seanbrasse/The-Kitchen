import React from "react";
import "./comment.css";
import PostingList from "./PostingList.js";

export default class CommentForm extends React.Component {
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
        posttext: this.state.post_text,
        parentid: this.props.parent
      })
    })
      .then(res => res.json())
      .then(
        result => {
          if (this.state.socket) {
            this.state.socket.emit('newComment', { room: this.state.imageName, comment: this.state.post_text });
        }

          // update the count in the UI manually, to avoid a database hit
          //this.props.onAddComment(this.props.commentCount + 1);
          this.postListing.current.loadPosts();
        },
        error => {
          //alert("error!");
        }
      );
      this.setState({post_text: ''});
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
            Add A Comment to Post {this.props.parent}
            <br />   <textarea className="newComment" placeholder="Comment here..." onChange={this.myChangeHandler} value={this.state.post_text} />
          </label>
          <br />

          <input type="submit" value="submit" />
          <br />
       
          {this.state.postmessage}
        </form>
        <PostingList
          ref={this.postListing}
          parentID={this.props.parent}
         
          type="commentlist"
        />
      </div>
    )
  }
}
