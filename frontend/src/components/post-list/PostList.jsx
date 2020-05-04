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

  loadItems() {
    if (!this.state.loading) {
      this.setState({ loading: true });
      const FETCH_COUNT = 2;
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
            this.setState((prevState) => ({
              posts: [...prevState.posts, ...response.posts],
              page: prevState.page + 1,
            }));
          } else {
            this.setState({ outofPosts: true });
          }
          this.setState({ loading: false });
        });
    }
    if (sessionStorage.getItem("blocked_groupID")) {
      fetch("http://stark.cse.buffalo.edu/cse410/deldev/api/gmcontroller.php", {
        method: "post",
        body: JSON.stringify({
          action: "getGroupMembers",
          groupid: sessionStorage.getItem("blocked_groupID"),
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.group_members != null) {
          for (var i = 0; i < data.group_members.length; i++) {
            var member = data.group_members[i];
            for (var j = 0; j < this.state.posts.length; j++) {
              if (member.user_id == this.state.posts[j].user_id) {
                this.state.posts.splice(i, 1);
              }
            }
          }
        }
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
                                        <li key={post.post_id} className={`${styles.cardli} ${sessionStorage.getItem('smallCards') ? styles.small : ''}`}>
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
