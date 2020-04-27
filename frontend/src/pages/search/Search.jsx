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
            ...state.excludeIngredients.split(',').map(ing => ({method: 'exclude', tag: ing, type: 'ingredient'})),
            {method: 'min', tag: this.minPrepTime, type: 'PrepTime'},
            {method: 'max', tag: this.maxPrepTime, type: 'PrepTime'},
            {method: 'min', tag: this.minCookTime, type: 'CookTime'},
            {method: 'max', tag: this.maxCookTime, type: 'CookTime'},
        ];
    }

    render() {
        return (
            <main>
                <h1>SEARCH</h1>
                <form
                    onSubmit={() => this.setState(prevState => ({fetchParams:{
                        ...prevState.fetchParams,
                        posttext: prevState.search,
                        tag_filters: this.genTagFilters(prevState)
                    }}))}
                >
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
                            <label for="exclude-ingredients">Exclude Ingredients</label>
                            <input name="exclude-ingredients" type="text" onChange={e => this.setState({excludeIngredients: e.target.value})}/>
                            <br/><br/>

                            <label for="min-prep-time">Min Prep Time</label>
                            <input name="min-prep-time" type="number" onChange={e => this.setState({minPrepTime: e.target.value})}/>
                            <label for="max-prep-time">Max Prep Time</label>
                            <input name="max-prep-time" type="number" onChange={e => this.setState({maxPrepTime: e.target.value})}/>
                            <br/><br/>
                            
                            <label for="min-cook-time">Min Cook Time</label>
                            <input name="min-cook-time" type="number" onChange={e => this.setState({minCookTime: e.target.value})}/>
                            <label for="max-cook-time">Max Cook Time</label>
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