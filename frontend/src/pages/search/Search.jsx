import React from 'react';
import {PostList} from 'components';
import styles from './Search.module.css';
import { MdStar } from 'react-icons/md';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            search: '',
            sort: 'new',
            excludeIngredients: '',
            tags: '',
            minPrepTime: null,
            maxPrepTime: null,
            minCookTime: null,
            maxCookTime: null,
            minRating: null,
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
            ...state.excludeIngredients.split(',').filter(str=>str).map(tag => ({method: 'exclude', tag, type: 'ingredient'})),
            ...state.tags.split(',').filter(str=>str).map(tag => ({method: 'include', tag, type: 'Tag'})),
            {method: 'min', tag: state.minPrepTime, type: 'PrepTime'},
            {method: 'max', tag: state.maxPrepTime, type: 'PrepTime'},
            {method: 'min', tag: state.minCookTime, type: 'CookTime'},
            {method: 'max', tag: state.maxCookTime, type: 'CookTime'},
            {method: 'min', tag: state.minRating, type: 'Rating'},
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
                            sort: prevState.sort,
                            tag_filters: this.genTagFilters(prevState)
                        }}));
                        e.preventDefault();
                    }
                }>
                    <div className={styles.searchbar}>
                        <label for="search">Search</label>
                        <input
                            id="search"
                            type="text" value={this.state.search} className={styles.search}
                            onChange={e => this.setState({search: e.target.value})}
                        />
                        <input type="submit" value="Search"/>
                    </div>
                    <div className={styles.listWrapper}>
                        <PostList fetchParams={this.state.fetchParams} className={styles.recipeList}/>
                        <div className={`card ${styles.extraSearch}`}>
                            <h3>Search Details</h3>
                            <label htmlFor="order">Order By</label><br/>
                            <select id="order" value={this.state.sort} onChange={e => this.setState({sort: e.target.value})}>
                                <option value="new">Newest</option>
                                <option value="old">Oldest</option>
                                <option value="top">Highest Rated</option>
                            </select>
                            <br/><br/>

                            <label htmlFor="tags">Tags</label><br/>
                            <input id="tags" type="text" onChange={e => this.setState({tags: e.target.value})}/>
                            <br/><br/>

                            <label htmlFor="exclude-ingredients">Exclude Ingredients</label><br/>
                            <input id="exclude-ingredients" type="text" onChange={e => this.setState({excludeIngredients: e.target.value})}/>
                            <br/><br/>

                            <label htmlFor="min-prep-time">Minimum Prep Time</label><br/>
                            <input id="min-prep-time" type="number" onChange={e => this.setState({minPrepTime: e.target.value})}/><br/>
                            <label htmlFor="max-prep-time">Maximum Prep Time</label><br/>
                            <input id="max-prep-time" type="number" onChange={e => this.setState({maxPrepTime: e.target.value})}/>
                            <br/><br/>
                            
                            <label htmlFor="min-cook-time">Minimum Cook Time</label><br/>
                            <input id="min-cook-time" type="number" onChange={e => this.setState({minCookTime: e.target.value})}/><br/>
                            <label htmlFor="max-cook-time">Maximum Cook Time</label><br/>
                            <input id="max-cook-time" type="number" onChange={e => this.setState({maxCookTime: e.target.value})}/>
                            <br/><br/>

                            Minimum Rating<br/>
                            <div className={"starRatingContainer"}>
                                <input type="radio" id="1Star" name="rating" value="1" onClick={() => this.setState({minRating: 1})}></input>
                                <label for="1Star">
                                <MdStar
                                color={1 <= (this.state.hover || this.state.minRating) ? "#fd0" : "lightgrey"}
                                onMouseEnter={() => this.setState({hover: 1})}
                                onMouseLeave={() => this.setState({hover: 0})}
                                />
                                </label>
                                <input type="radio" id="2Star" name="rating" value="2" onClick={() => this.setState({minRating: 2})}></input>
                                <label for="2Star">
                                <MdStar
                                color={2 <= (this.state.hover || this.state.minRating) ? "#fd0" : "lightgrey"}
                                onMouseEnter={() => this.setState({hover: 2})}
                                onMouseLeave={() => this.setState({hover: 0})}
                                />
                                </label>
                                <input type="radio" id="3Star" name="rating" value="3" onClick={() => this.setState({minRating: 3})}></input>
                                <label for="3Star">
                                <MdStar
                                color={3 <= (this.state.hover || this.state.minRating) ? "#fd0" : "lightgrey"}
                                onMouseEnter={() => this.setState({hover: 3})}
                                onMouseLeave={() => this.setState({hover: 0})}
                                />
                                </label>
                                <input type="radio" id="4Star" name="rating" value="4" onClick={() => this.setState({minRating: 4})}></input>
                                <label for="4Star">
                                <MdStar
                                color={4 <= (this.state.hover || this.state.minRating) ? "#fd0" : "lightgrey"}
                                onMouseEnter={() => this.setState({hover: 4})}
                                onMouseLeave={() => this.setState({hover: 0})}
                                />
                                </label>
                                <input type="radio" id="5Star" name="rating" value="5" onClick={() => this.setState({minRating: 5})}></input>
                                <label for="5Star">
                                <MdStar
                                color={5 <= (this.state.hover || this.state.minRating) ? "#fd0" : "lightgrey"}
                                onMouseEnter={() => this.setState({hover: 5})}
                                onMouseLeave={() => this.setState({hover: 0})}
                                />
                                </label>
                            </div>
                            <br/>

                            <input type="submit" value="Search"/>
                        </div>
                    </div>
                </form>
            </main>
        );
    }
}