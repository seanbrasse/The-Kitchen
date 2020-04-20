import React from 'react';
import {PostList} from 'components';
import styles from './Search.module.css';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            search: '',
            fetchParams: {
                action: 'getPosts',
                posttype: 'Recipe',
                posttext: ''
            }
        }
    }
    
    render() {
        return (
            <main>
                <h1>SEARCH</h1>
                <form
                    className={styles.searchbar}
                    onSubmit={() => this.setState(prevState => ({fetchParams:{...prevState.fetchParams, posttext: prevState.search}}))}
                >
                    <input
                        type="text" value={this.state.search} className={styles.search}
                        onChange={e => this.setState({search: e.target.value})}
                    />
                    <input
                        type="submit" value="Search"
                    />
                </form>
                <PostList fetchParams={this.state.fetchParams} className={styles.recipeList}/>
            </main>
        );
    }
}