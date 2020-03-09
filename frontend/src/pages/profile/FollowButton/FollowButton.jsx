import React from 'react';
import styles from './FollowButton.module.css';

export default class FollowButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Who does this button connect to?
            userID: props.userID
        }
    }

    render() {
        return <button className={styles.followButton} onClick={() => this.onClick()}>Follow</button>;
    }

    onClick() {
        fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/connectioncontroller.php', {
            method: "post",
            body: JSON.stringify({
                action: "addOrEditConnections",
                userid: localStorage.getItem('userid'),
                connectuserid: this.state.userID,
                connectiontype: "follow",
                connectionstatus: "following"
            })
        })
    }
}