import React from 'react';
import {PostList} from 'components';
import styles from './Search.module.css';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            search: '',
            excludeIngredients: '',
            minPrepTime: null,
            maxPrepTime: null,
            minCookTime: null,
            maxCookTime: null,
            fetchParams: {
                action: 'getPosts',
                posttype: 'Recipe',
                posttext: '',
                tag_filters: []
            }
        }
    }
    
    genTagFilters(state) {
        return [
            ...state.excludeIngredients.split(',').filter(str=>str).map(ing => ({method: 'exclude', tag: ing, type: 'ingredient'})),
            {method: 'min', tag: state.minPrepTime, type: 'PrepTime'},
            {method: 'max', tag: state.maxPrepTime, type: 'PrepTime'},
            {method: 'min', tag: state.minCookTime, type: 'CookTime'},
            {method: 'max', tag: state.maxCookTime, type: 'CookTime'},
        ];
    }

    render() {
        return (
            <main>
                <h1>SEARCH</h1>
                <form onSubmit={(e) => {
                        this.setState(prevState => ({fetchParams:{
                            ...prevState.fetchParams,
                            posttext: prevState.search,
                            tag_filters: this.genTagFilters(prevState)
                        }}));
                        e.preventDefault();
                    }
                }>
                    <div className={styles.searchbar}>
                        <input
                            type="text" value={this.state.search} className={styles.search}
                            onChange={e => this.setState({search: e.target.value})}
                        />
                        <input type="submit" value="Search"/>
                    </div>
                    <div className={styles.listWrapper}>
                        <PostList fetchParams={this.state.fetchParams} className={styles.recipeList}/>
                        <div className={`card ${styles.extraSearch}`}>
                            <h3>Search Details</h3>
                            <label htmlFor="exclude-ingredients">Exclude Ingredients</label><br/>
                            <input name="exclude-ingredients" type="text" onChange={e => this.setState({excludeIngredients: e.target.value})}/>
                            <br/><br/>

                            <label htmlFor="min-prep-time">Min Prep Time</label><br/>
                            <input name="min-prep-time" type="number" onChange={e => this.setState({minPrepTime: e.target.value})}/><br/>
                            <label htmlFor="max-prep-time">Max Prep Time</label><br/>
                            <input name="max-prep-time" type="number" onChange={e => this.setState({maxPrepTime: e.target.value})}/>
                            <br/><br/>
                            
                            <label htmlFor="min-cook-time">Min Cook Time</label><br/>
                            <input name="min-cook-time" type="number" onChange={e => this.setState({minCookTime: e.target.value})}/><br/>
                            <label htmlFor="max-cook-time">Max Cook Time</label><br/>
                            <input name="max-cook-time" type="number" onChange={e => this.setState({maxCookTime: e.target.value})}/>
                            <br/><br/>

                            <input type="submit" value="Search"/>
                        </div>
                    </div>
                </form>
            </main>
        );
    }
}