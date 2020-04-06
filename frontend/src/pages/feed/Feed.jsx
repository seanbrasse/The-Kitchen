import React from 'react';
import {RecipeCard} from 'components';
import { useParams, Link} from "react-router-dom";
import {parseRecipe} from 'util/parseRecipe.js';
import styles from './Feed.module.css';
import {
  faEdit
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditRecipe from './../recipe/edit-recipe/EditRecipe';

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

    myProfile() {
         let { userID } = useParams();
         sessionStorage.setItem("user_id", userID);
         let myUserId = sessionStorage.getItem("userID"); //just an idea for accessing my profile

         if (myUserId == userID) {
             return (
               <Link to="/recipe/:recipeID/edit" className="editRecipe">
                 <FontAwesomeIcon
                   icon={faEdit}
                   size="1x"
                   onClick={EditRecipe}
                   color="black"
                 ></FontAwesomeIcon>
               </Link>
                
             );
        } else {
            return <div></div>;
        }
    }

    // editMyProfile() {
    //     if (myUserId == userID) {
        
    //     }
    // }
    
    render() {
        return (
            <main>
                <h1 className= "feed-type">FEED</h1>
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
                                    <this.myProfile/>
                                </li>
                            );
                        })
                    }
                </ul>
            </main>
        );
    }
}