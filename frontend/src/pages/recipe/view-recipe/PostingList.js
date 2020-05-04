import React from "react";
import Post from "./Post.js";
import "./comment.svg"
export default class PostingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      posts: [],
      listType: props.listType
    };
  }

  componentDidMount() {
    this.loadPosts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.parentID !== this.props.parentID) {
      this.loadPosts();
    }
  }

  loadPosts() {
    //if (this.props.parentID) {
      fetch("http://stark.cse.buffalo.edu/cse410/deldev/api/postcontroller.php", {
        method: "post",
        body: JSON.stringify({
          action: "getPosts",
          max_posts: "3",
          parentid: this.props.parentID
        })
      })
      .then(res => res.json())
      .then(
       
        result => {
        
          if (result.posts) {
            this.setState({
              isLoaded: true,
              posts: result.posts
            });
         }
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
    //}
  }

  render() {
    const {error, isLoaded, posts} = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    //} else if (!isLoaded) {
      //return <div> Loading... </div>;
    } else {
      return (
        <div className="posts">
          {posts.map(post => (
            <Post key={post.post_ID} post={post} type={this.props.type} />
          ))}
        </div>
      );
    }
  }
}
