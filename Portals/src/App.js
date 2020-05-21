import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {AuthContext} from './context/AuthContext';
import { HomePage } from './components/HomePage';
import { useAppState } from './hooks/useAppState';
import { PrivateRoute } from './components/PrivateRoute';
import { UserData } from './components/UserData';
import './App.css';

function App() {
  const [appState, login, logout, addUserData] = useAppState();
  const isAuthenticated = !!appState.lastUser;

  return (
    <AuthContext.Provider value={{
      appState,
      login,
      logout,
      addUserData,
      isAuthenticated,
    }}>
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <PrivateRoute path='/userData'>
            <UserData />
          </PrivateRoute>>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
