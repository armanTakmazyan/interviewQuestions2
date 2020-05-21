import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const HomePage = () => {
    const [inputValue, setInputValue] = useState('');
    const authContext = useContext(AuthContext);
    const isAuthenticated = authContext.isAuthenticated;

    const inputOnChange = (e) => {
        setInputValue(e.target.value);
    };

    const submitName = (e) => {
        if(inputValue !== ''){
            authContext.login(inputValue);
        }
    };

    console.log(authContext);
    if(isAuthenticated){
        return <Redirect to={{
            pathname: '/userData'
        }} />
    }else {
        return (
            <div>
                <p>Login</p>
                <input type="text" value={inputValue} onChange={inputOnChange} placeholder="Name..." />
                <button onClick={submitName}>Login</button>
            </div>
        );
    }
};