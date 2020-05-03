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

  loadPosts() {
    
    fetch("http://stark.cse.buffalo.edu/cse410/deldev/api/postcontroller.php", {
      method: "post",
      body: JSON.stringify({
        action: "getPosts",
        max_posts: "3",
<<<<<<< HEAD
        parentid: this.props.parentID
=======
        parentid: this.props.parentid
>>>>>>> a1ba7db2f5d1929dcf6a4dd5a1628abb4aac70bc
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
  }

  render() {
    this.loadPosts();
    const {error, isLoaded, posts} = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
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
