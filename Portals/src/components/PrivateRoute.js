
import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const PrivateRoute = ({ children, ...rest }) => {
    const authContext = useContext(AuthContext);
    const isAuthenticated = authContext.isAuthenticated;
    return (
      <Route
        {...rest}
        render={({ location }) =>
            isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          )
        }
      />
    );
  }