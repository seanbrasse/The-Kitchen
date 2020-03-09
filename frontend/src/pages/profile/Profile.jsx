import React from 'react';
import { useParams, Link } from 'react-router-dom';
import AccountSettings from '../account-settings/AccountSettings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';
import avatar from './img_avatar.png';

export default function Profile() {
    let { userID } = useParams();

    const followers = []
    for (var i = 0; i <= 5; i++) {
        followers.push(<button className="follower" key={i}>Follower<FontAwesomeIcon icon={faEllipsisV} className="btn-setting"></FontAwesomeIcon></button>)
    }

    return (
        <main>
            <div className="profile">
                <img className="profile-image" src={avatar}></img>
                <h1 className="profile-name">Profile {userID}</h1>
                <Link to="/settings" className="settings"><FontAwesomeIcon icon={faCog} size="lg" onClick={AccountSettings} color="black"></FontAwesomeIcon></Link>
            </div>
            <div className="sidebar">
                <h1 className="left-text">Bio</h1>
                <p className="left-text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <h1 className="left-text">Followers</h1>
                {followers}
            </div>
        </main>
    );
}