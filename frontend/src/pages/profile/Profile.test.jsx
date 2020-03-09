import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { render } from '@testing-library/react';
import Profile from './Profile';

test('renders follow button', () => {
    fetch.mockResponseOnce(JSON.stringify({}));

    // TODO: Test with followed + unfollowed
    const { getByText } = render(
        <MemoryRouter initialEntries={["/users/123"]}>
            <Profile />
        </MemoryRouter>
    );
    const followButton = getByText(/follow/i);
    expect(followButton).toBeInTheDocument();
});
