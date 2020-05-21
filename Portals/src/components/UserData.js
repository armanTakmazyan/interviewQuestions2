import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const UserData = () => {
    const [inputValue, setInputValue] = useState('');
    const authContext = useContext(AuthContext);
    const appState = authContext.appState;

    const inputOnChange = (e) => {
        setInputValue(e.target.value);
    };

    const user = appState.users.filter((obj) => {
        return obj.userName === appState.lastUser;
    });

    const logoutHandler = (e) => {
        authContext.logout();
    };

    const addDataHandler = (e) => {
        if(inputValue !== ''){
            return authContext.addUserData(inputValue);
        }
    };

    return(
        <div>
            <p>{appState.lastUser} - Data</p>
             <div>
                <input type="text" value={inputValue} onChange={inputOnChange} />
                <button onClick={addDataHandler}>Add New Data</button>
             </div>
            {
                user[0].userData.length >=1 ? user[0].userData.map((obj) => {
                    return <p key={obj.id}>{obj.data}</p>
                }) : <p>User don't have any data</p> 
            }
            <button onClick={logoutHandler}>Logout</button>
        </div>
    );
};