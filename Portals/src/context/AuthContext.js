import { createContext } from 'react';

function noop(){}

export const AuthContext = createContext({
    appState: null,
    login: noop,
    logout: noop,
    addUserData: noop,
    isAuthenticated: false
});