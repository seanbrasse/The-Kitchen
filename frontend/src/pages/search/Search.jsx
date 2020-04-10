import React from 'react';
import {PostList} from 'components';
import styles from './Search.module.css';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            search: ''
        }
    }

    componentDidMount() {
        this.updatePosts();
    }

    updatePosts() {
        fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/postcontroller.php', {
            method: 'post',
            body: JSON.stringify({
                action: 'getPosts',
                posttype: 'Recipe',
                posttext: this.state.search
            })
        }).then(res => res.json()).then(
            response => {
                this.setState({
                    posts: response.posts ? response.posts : []
                });
            }
        ); 
    }
    
    render() {
        return (
            <main>
                <h1>SEARCH</h1>
                <div className={styles.searchbar}>
                    <input
                        type="text" value={this.state.search} className={styles.search}
                        onChange={e => this.setState({search: e.target.value})}
                    />
                    <button onClick={() => this.updatePosts()}>Search</button>
                </div>
                <PostList posts={this.state.posts} className={styles.recipeList}/>
            </main>
        );
    }
}