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
            ...state.excludeIngredients.split(',').map(ing => ({include: false, tag: ing, type: 'ingredient'}))
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
                        <input
                            type="submit" value="Search"
                        />
                    </div>
                    <div className={styles.listWrapper}>
                        <PostList fetchParams={this.state.fetchParams} className={styles.recipeList}/>
                        <form className={`card ${styles.extraSearch}`}>
                            <h3>Additional Search Details</h3>
                            <h4>Exclude Ingredients</h4>
                            <input type="text" onChange={e => this.setState({excludeIngredients: e.target.value})}/>
                        </form>
                    </div>
                </form>
            </main>
        );
    }
}