import React from 'react';
import styles from './FollowButton.module.css';

export default class FollowButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Who does this button connect to?
            currentlyFollowed: false,
            loadingFollowStatus: true,
            connectionID: undefined
        }
    }
    
    componentDidMount() {
        this.updateFollowed();
    }

    componentDidUpdate(prevProps) {
        if (this.props.userID !== prevProps.userID) {
            this.setState({loadingFollowStatus: true});
          this.updateFollowed();
        }
      }

    updateFollowed() {
        this._getFollowStatus = fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/connectioncontroller.php', {
            method: 'post',
            body: JSON.stringify({
                action: 'getConnections',
                user_id: sessionStorage.getItem('userID'),
                connectuserid: this.props.userID,
                connectiontype: 'Follow',
                connectionstatus: 'Active',
                session_token: sessionStorage.getItem('token')
            })
        }).then(res => res.json()).then(
            response => {
                this._getFollowStatus = null;
                this.setState({
                    currentlyFollowed: response.connections?.some(connection =>
                        connection.connection_type == 'Follow' &&
                        connection.connection_status == 'Active'
                    ),
                    connectionID: response.connections?.find(connection =>
                        connection.connection_type == 'Follow' &&
                        connection.connection_status == 'Active'
                    )?.connection_id,
                    loadingFollowStatus: false,
                });
            }
        );
    }
    
    componentWillUnmount() {
        if (this._getFollowStatus) {
            this._getFollowStatus.cancel();
        }
    }
    
    render() {
        return (
            <button className={styles.followButton} onClick={() => this.onClick()} disabled={this.state.loadingFollowStatus}>
                {this.state.currentlyFollowed ? 'Unfollow' : 'Follow'}
            </button>
        );
    }
        
    onClick() {
        fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/connectioncontroller.php', {
            method: 'post',
            body: JSON.stringify({
                action: 'addOrEditConnections',
                user_id: sessionStorage.getItem('userID'),
                connectuserid: this.props.userID,
                connectiontype: 'Follow',
                connectionstatus: this.state.currentlyFollowed ? 'Inactive' : 'Active',
                connectionid: this.state.connectionID,
                session_token: sessionStorage.getItem('token')
            })
        }).then(res => res.json()).then(
            response => {
                if (response.Status.startsWith('SUCCESS')) this.setState(state => ({currentlyFollowed: !state.currentlyFollowed}))
            }
        );
    }
}