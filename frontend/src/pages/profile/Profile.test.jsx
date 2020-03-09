import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { render } from '@testing-library/react';
import Profile from './Profile';

test('renders follow button', () => {
    // TODO: Mock API, test with followed + unfollowed
    const { getByText } = render(
        <MemoryRouter initialEntries={["/users/someuser"]}>
            <Profile />
        </MemoryRouter>
    );
    const followButton = getByText(/follow/i);
    expect(followButton).toBeInTheDocument();
});
