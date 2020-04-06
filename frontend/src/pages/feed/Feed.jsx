import React from 'react';
import {RecipeCard} from 'components';
import {parseRecipe} from 'util/parseRecipe.js';
import styles from './Feed.module.css';

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        this._getFollowStatus = fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/postcontroller.php', {
            method: 'post',
            body: JSON.stringify({
                action: 'getConnectionPosts',
                user_id: sessionStorage.getItem('userID'),
                posttype: 'Recipe'
            })
        }).then(res => res.json()).then(
            response => {
                this.setState({
                    posts: response.posts
                });
            }
        );
    }
    
    render() {
        return (
            <main>
                <h1>FEED</h1>
                <ul className={`unstyled ${styles.recipeList}`}>
                    {
                        this.state.posts.map(post => {
                            const recipe = parseRecipe(post.post_text);
                            return (
                                <li>
                                    <RecipeCard
                                        recipeID={post.post_id}
                                        title={recipe.title}
                                        description={recipe.description}
                                        image={post.post_pic_url}
                                        userid={post.user_id}
                                        username="User"
                                    />
                                </li>
                            );
                        })
                    }
                </ul>
            </main>
        );
    }
}