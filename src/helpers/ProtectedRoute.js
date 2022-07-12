/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ loggedInUser, children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) => {
                if (loggedInUser) {
                    return React.cloneElement(children, { loggedInUser });
                }

                if (!loggedInUser) {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: location },
                            }}
                        />
                    );
                }

                return null;
            }}
        />
    );
}
