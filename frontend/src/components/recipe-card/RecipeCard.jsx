import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import styles from './RecipeCard.module.css';

export default class RecipeCard extends React.Component {
    deletePost() {
        fetch("http://stark.cse.buffalo.edu/cse410/deldev/api/postcontroller.php", {
            method: "post",
            body: JSON.stringify({
              action: "deletePosts",
              postid: this.props.recipeID,
              user_id: sessionStorage.getItem("userID"),
              session_token: sessionStorage.getItem("token"),
            }),
          }
        ).then((res) => res.json()).then((response) => {
            if (response.Exception == null) {
              window.location.reload();
            }
        });
    }

    render() {
        return (
            <article className={`card ${styles.card} ${sessionStorage.getItem('smallCards') ? styles.small : ''}`}>
                {
                    this.props.userid === sessionStorage.getItem('userID') ? 
                        <React.Fragment>
                            <Link to={`/recipe/${this.props.recipeID}/edit`} className={styles.editRecipe}>
                                <FontAwesomeIcon
                                icon={faEdit}
                                size="1x"
                                color="black"
                                ></FontAwesomeIcon>
                            </Link>
                            <FontAwesomeIcon
                                className={styles.deleteRecipe}
                                icon={faTrashAlt}
                                onClick={() => this.deletePost()}
                                size="1x"
                                color="black"
                            />
                        </React.Fragment> : null
                }
                <div className={styles.imgCol}>
                    <img src={this.props.image} className={styles.image} alt="Recipe dish"/>
                </div>
                <div className={styles.infoCol}> 
                    <div className={styles.topInfo}>
                        <Link to={`/recipe/${this.props.recipeID}`}><h2>{this.props.title}</h2></Link>
                        <span>By <Link to={`/user/${this.props.userid}`}>{this.props.username}</Link></span>
                       
                        
                        { 
                            /*
                            // TODO: separate component with filled/unfilled/partially filled [actual icon] stars
                            <span>* * * * *</span>
                            <ul className={styles.tags}>
                                <li>#first</li>
                                <li>#second</li>
                                <li>#third</li>
                                <li>#more</li>
                                <li>#again</li>
                                <li>#whatevenisthis</li>
                            </ul>
                            */
                        }
                        <p>
                            {this.props.description}
                        </p>
                    </div>
                    <div className={styles.bottomInfo}>
                        <Link to={`/recipe/${this.props.recipeID}`}>Read More ></Link>
                    </div>
                </div>
            </article>
        );
    }
}