import React from 'react';
import { render } from '@testing-library/react';
import Deferred from 'util/deferred';
import FollowButton from './FollowButton';

const currentUserID = '889';
const userIDToConnect = '123';

beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('userid', currentUserID);
    fetch.resetMocks();
});

test('follow button doesn\'t enable until initial follow status is determined', async () => {
    const statusDeferred = new Deferred();
    fetch.mockResponseOnce(() => statusDeferred.promise);

    const { getByRole } = render(
        <FollowButton userID={userIDToConnect}/>
    );

    const followButton = getByRole('button');
    expect(followButton).toBeInTheDocument();

    expect(followButton.disabled).toEqual(true);
    
    statusDeferred.resolve(JSON.stringify({}));
    await followButton._getFollowStatus;
    // Let react rerender
    await new Promise(resolve => setTimeout(() => resolve()));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(followButton.disabled).toEqual(false);
});

test('follow button initializes correctly when not followed', async () => {
    fetch.mockResponseOnce(JSON.stringify({}));

    const { getByRole } = render(
        <FollowButton userID={userIDToConnect}/>
    );

    const followButton = getByRole('button');
    expect(followButton).toBeInTheDocument();

    await followButton._getFollowStatus;
    // Let react rerender
    await new Promise(resolve => setTimeout(() => resolve()));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(followButton.innerHTML).toEqual('Follow');
});

test('follow button initializes correctly when followed', async () => {
    fetch.mockResponseOnce(JSON.stringify({connections: [{
        'connection_type': 'Friend',
        'connection_status': 'Active'
    }]}));

    const { getByRole } = render(
        <FollowButton userID={userIDToConnect}/>
    );

    const followButton = getByRole('button');
    expect(followButton).toBeInTheDocument();

    await followButton._getFollowStatus;
    // Let react rerender
    await new Promise(resolve => setTimeout(() => resolve()));

    expect(fetch.mock.calls.length).toEqual(1);
    expect(followButton.innerHTML).toEqual('Unfollow');
});

test('follow button requests follow on click', async () => {
    // Initial fetch for follow status
    fetch.mockResponseOnce(JSON.stringify({}));

    const { getByRole } = render(
        <FollowButton userID={userIDToConnect}/>
    );
    
    const followButton = getByRole('button');
    expect(followButton).toBeInTheDocument();

    // We can't click on the button until the initial fetch for status is done
    await followButton._getFollowStatus;
    // Let react rerender
    await new Promise(resolve => setTimeout(() => resolve()));
    fetch.mockResponseOnce(JSON.stringify({'Status': 'SUCCESS - Inserted Id 4212'}));
    followButton.click();

    expect(fetch.mock.calls.length).toEqual(2);
    const url = fetch.mock.calls[1][0];
    const body = JSON.parse(fetch.mock.calls[1][1].body);

    expect(url).toMatch(/connectioncontroller.php$/);
    
    expect(body.action).toEqual('addOrEditConnections');
    expect(body.userid).toEqual(currentUserID);
    expect(body.connectuserid).toEqual(userIDToConnect);
    expect(body.connectiontype).toEqual('Follow');
    expect(body.connectionstatus).toEqual('Active');
});

test('follow button updates correctly from unfollowed to followed', async () => {
    fetch.mockResponseOnce(JSON.stringify({}));

    const { getByRole } = render(
        <FollowButton userID={userIDToConnect}/>
    );

    const followButton = getByRole('button');
    expect(followButton).toBeInTheDocument();

    await followButton._getFollowStatus;
    // Let react rerender
    await new Promise(resolve => setTimeout(() => resolve()));
    fetch.mockResponseOnce(JSON.stringify({'Status': 'SUCCESS - Inserted Id 4212'}));
    followButton.click();

    // Let react rerender
    await new Promise(resolve => setTimeout(() => resolve()));
    expect(followButton.innerHTML).toEqual('Unfollow');
});
