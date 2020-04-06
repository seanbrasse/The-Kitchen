import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './RecipeCard.module.css';

export default class RecipeCard extends React.Component {
    render() {
        return (
            <NavLink to={`/recipe/${this.props.recipeID}`} className={styles.cardLink}>
                <article className={`card ${styles.card}`}>
                    <div className={styles.imgCol}>
                        <img src={this.props.image} className={styles.image}/>
                    </div>
                    <div className={styles.infoCol}>
                        <div className={styles.topInfo}>
                        <h2>{this.props.title}</h2>
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
                            <NavLink to={`/recipe/${this.props.recipeID}`}>Read More ></NavLink>
                        </div>
                    </div>
                </article>
            </NavLink>
        );
    }
}