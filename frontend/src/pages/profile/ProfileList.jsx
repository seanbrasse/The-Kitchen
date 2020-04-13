import React from "react";
import { Link } from "react-router-dom";
import { RecipeCard } from "components";
import { parseRecipe } from "util/parseRecipe.js";
import styles from "./ProfileList.module.css";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function ProfileList(props) {
  return props.posts.length > 0 ? (
    <ul className={`unstyled ${props.className}`}>
      {props.posts.map((post) => {
        const recipe = parseRecipe(post.post_text);
        const p = post.post_id;
        return (
          <li
            key={post.post_id}
            className={`${styles.cardli} ${
              sessionStorage.getItem("smallCards") ? styles.small : ""
            }`}
          >
            <FontAwesomeIcon
              className={styles.deleteButton}
              icon={faTrashAlt}
              onClick={deletePost}
              style={{
                visibility: props.delete ? "visible" : "hidden",
              }}
              size="1x"
              color="black"
            />
            <Link
              to={`/recipe/${post.post_id}/edit`}
              className={styles.editRecipe}
            >
              <FontAwesomeIcon
                className={styles.editButton}
                icon={faEdit}
                style={{
                  visibility: props.delete ? "visible" : "hidden",
                }}
                size="1x"
                color="black"
              />
            </Link>

            <div className={styles.card}>
              <RecipeCard
                className={styles.recipeCard}
                recipeID={post.post_id}
                title={recipe.title}
                description={recipe.description}
                image={post.post_pic_url}
                userid={post.user_id}
                username={`User ${post.user_id}`}
              />
            </div>
          </li>
        );
        
        

        function deletePost() {
          fetch(
            "http://stark.cse.buffalo.edu/cse410/deldev/api/postcontroller.php",
            {
              method: "post",
              body: JSON.stringify({
                action: "deletePosts",
                postid: p,
                user_id: sessionStorage.getItem("userID"),
                session_token: sessionStorage.getItem("token"),
              }),
            }
          )
            .then((res) => res.json())
            .then((response) => {
              if (response.Exception == null) {
                window.location.reload();
              }
            });
        }
      })}
    </ul>
  ) : (
    <article className="card">
      There's nothing here yet -{" "}
      <Link to="/search">explore some new recipes</Link>!
    </article>
  );
}
