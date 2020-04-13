import React from 'react';
import {Link} from 'react-router-dom';
import styles from './RecipeCard.module.css';

export default class RecipeCard extends React.Component {

    render() {
        return (
            <article className={`card ${styles.card} ${sessionStorage.getItem('smallCards') ? styles.small : ''}`}>
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