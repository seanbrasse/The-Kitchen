import React from 'react';
import styles from './Feed.module.css';
import {PostList} from 'components';

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/postcontroller.php', {
            method: 'post',
            body: JSON.stringify({
                action: 'getConnectionPosts',
                user_id: sessionStorage.getItem('userID'),
                posttype: 'Recipe'
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
                <h1 className= "feed-type">FEED</h1>
                <PostList posts={this.state.posts} className={styles.recipeList}/>
            </main>
        );
    }
}