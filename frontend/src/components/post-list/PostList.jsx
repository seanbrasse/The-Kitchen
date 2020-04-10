import React from 'react';
import { Link } from "react-router-dom";
import {RecipeCard} from 'components';
import {parseRecipe} from 'util/parseRecipe.js';
import styles from './PostList.module.css';

export default function PostList(props) {
    return (
        props.posts.length > 0 ? <ul className={`unstyled ${props.className}`}>
            {
                props.posts.map(post => {
                    const recipe = parseRecipe(post.post_text);
                    return (
                        <li key={post.post_id} className={styles.cardli}>
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
        </ul> : <article className="card">There's nothing here yet - <Link to="/search">explore some new recipes</Link>!</article>
    );
}
