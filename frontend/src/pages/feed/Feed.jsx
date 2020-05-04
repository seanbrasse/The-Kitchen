import React from 'react';
import styles from './Feed.module.css';
import {PostList} from 'components';

export default class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            fetchParams: {
                action: 'getConnectionPosts',
                user_id: sessionStorage.getItem('userID'),
                userid: sessionStorage.getItem('userID'),
                posttype: 'Recipe'
            }
        }
    }
    
    render() {
        return ( 
            <main>
                <h1 className= "feed-type">FEED</h1>
                <div className={styles.listWrapper}>
                    <PostList fetchParams={this.state.fetchParams} className/>
                </div>
            </main>
        );
    }
}