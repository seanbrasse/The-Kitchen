import React from "react";
import { Link } from "react-router-dom";
import { RecipeCard } from "components";
import { parseRecipe } from "util/parseRecipe.js";
import styles from "./PostList.module.css";
import InfiniteScroll from "react-infinite-scroller";

export default class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      page: 0,
      outofPosts: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.fetchParams) !==
      JSON.stringify(prevProps.fetchParams)
    ) {
      this.setState({ page: 0, posts: [], outofPosts: false });
      this.forceUpdate();
    }
  }

  async loadItems() {
    if (!this.state.loading) {
      this.setState({ loading: true });
      const FETCH_COUNT = 2;

      let blockeddata = null;
      if (sessionStorage.getItem("blocked_groupID")) {
        blockeddata = await fetch("http://stark.cse.buffalo.edu/cse410/deldev/api/gmcontroller.php", {
          method: "post",
          body: JSON.stringify({
            action: "getGroupMembers",
            groupid: sessionStorage.getItem("blocked_groupID"),
          }),
        })
        .then((res) => res.json())
      }

      fetch(
        "http://stark.cse.buffalo.edu/cse410/deldev/api/postcontroller.php",
        {
          method: "post",
          body: JSON.stringify({
            ...this.props.fetchParams,
            max_posts: FETCH_COUNT,
            offset: FETCH_COUNT * this.state.page,
          }),
        }
      )
        .then((res) => res.json())
        .then((response) => {
          if (response.posts) {

            /*if (data.group_members != null) {
              for (var i = 0; i < data.group_members.length; i++) {
                var member = data.group_members[i];
                for (var j = 0; j < this.state.posts.length; j++) {
                  console.log(`${member.user_id} ${this.state.posts[j].user_id}`)
                  if (member.user_id == this.state.posts[j].user_id) {
                    this.state.posts.splice(i, 1);
                  }
                }
              }
            }*/
            

            this.setState((prevState) => {
              let posts = [...prevState.posts, ...response.posts]
              if (blockeddata !== null && blockeddata.group_members != null) {
                console.log(blockeddata.group_members);
                console.log(posts);
                posts = posts.filter(post => !blockeddata.group_members.some(gm => gm.user_id === post.user_id))
              }
              return {
                posts,
                page: prevState.page + 1,
              }
            });
          } else {
            this.setState({ outofPosts: true });
          }
          this.setState({ loading: false });
        });
    }
  }

    render() {
        return (
            <div className={styles.listWrapper}>
                <InfiniteScroll
                    loadMore={() => this.loadItems()}
                    hasMore={!this.state.outofPosts}
                    loader={this.state.loading ? <div key={0}>Loading...</div> : null}
                >
                    {
                        this.state.posts.length > 0 ? <ul className={`unstyled ${this.props.className}`}>
                            {
                                this.state.posts.map(post => {
                                    const recipe = parseRecipe(post.post_text);
                                    return (
                                        <li key={post.post_id} className={`${styles.cardli} ${styles.small}`}>
                                            <RecipeCard
                                                recipeID={post.post_id}
                                                title={recipe.title}
                                                description={recipe.description}
                                                image={post.post_pic_url}
                                                userid={post.user_id}
                                                username={`User ${post.user_id}`}
                                            />
                                        </li>
                                    );
                                })
                            }
                        </ul> : null
                    }
                    {
                        this.state.posts.length === 0 && !this.state.loading ? 
                            <article className="card">There's nothing here yet - <Link to="/search">explore some new recipes</Link>!</article>
                            : null
                    }
                    {
                        this.state.posts.length > 0 && this.state.outofPosts ?
                            <article className="card">That's all we have - <Link to="/search">explore some new recipes</Link>!</article>
                            : null
                    }
                </InfiniteScroll>
            </div>
        );
    }
}
