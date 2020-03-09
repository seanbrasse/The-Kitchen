import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { render } from '@testing-library/react';
import FollowButton from './FollowButton';

const currentUserID = '889';

beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('userid', currentUserID);
});

test('follow button requests follow on click', () => {
    const userIDToConnect = '123';
    const { getByRole } = render(
        <FollowButton userID={userIDToConnect}/>
    );
    
    const followButton = getByRole('button');
    expect(followButton).toBeInTheDocument();

    fetch.mockResponseOnce(JSON.stringify({}));
    followButton.click();

    const url = fetch.mock.calls[0][0];
    const body = JSON.parse(fetch.mock.calls[0][1].body);

    expect(fetch.mock.calls.length).toEqual(1)

    expect(url).toMatch(/connectioncontroller.php$/);
    
    expect(body.action).toEqual('addOrEditConnections');
    expect(body.userid).toEqual(currentUserID);
    expect(body.connectuserid).toEqual(userIDToConnect);
    expect(body.connectiontype).toEqual('follow');
    expect(body.connectionstatus).toEqual('following');
});
