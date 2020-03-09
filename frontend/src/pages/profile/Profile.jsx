import React from 'react';
import {useParams} from 'react-router-dom';
import FollowButton from './FollowButton/FollowButton';

export default function Profile() {
    let { userID } = useParams();

    return (
        <main>
            <h1>PROFILE {userID}</h1>
            <FollowButton/>
        </main>
    );
}