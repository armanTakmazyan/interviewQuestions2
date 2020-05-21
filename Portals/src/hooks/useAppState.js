import { useCallback, useEffect, useReducer } from 'react';
import uniqid from 'uniqid';

const storageName = 'userData';
const storageDefaultValue = {
    lastUser: '',
    users: []
};

const appReducer = (state, action) => {
    switch(action.type){
        case 'login':
            return {
                ...state,
                lastUser: action.userName
            }
        case 'newUser':
            return {
                lastUser: action.userName,
                users: [...state.users, {
                    userName: action.userName,
                    userData: []
                }]
            }
        case 'logout':
            return {
                ...state,
                lastUser: ''
            }
        case 'addUserData':
            let newUsersData = state.users.map(obj => {
                if(obj.userName === state.lastUser){
                    return {
                        userName: obj.userName,
                        userData: [
                            ...obj.userData,
                            {
                                id: uniqid(),
                                data: action.newData 
                            }
                        ]
                    };
                }else {
                    return obj;
                }
            });
            console.log({
                lastUser: state.lastUser,
                users: [...newUsersData]
            });
            return {
                lastUser: state.lastUser,
                users: [...newUsersData]
            }
        default:
            return state;                
    }
};

function useStickyState(storageDefaultValue, key = "userData", reducer) {
    const stickyValue = window.localStorage.getItem(key);
    const initValue = stickyValue ? JSON.parse(stickyValue) : storageDefaultValue;

    const [appState, dispatch] = useReducer(reducer, initValue);

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(appState))
    }, [appState, dispatch, key]);

    return [appState, dispatch];
  }
  

export const useAppState = () => {
    const [appState, dispatch] = useStickyState(storageDefaultValue, storageName, appReducer);

    const login = useCallback((userName) => {
        for(const user in appState.users){
            if(userName === user){
                return dispatch({
                    type: 'login',
                    userName: userName
                })
            }
        }
        return dispatch({
            type: 'newUser',
            userName: userName
        })
    }, [appState.users, dispatch]);

    const logout = useCallback(() => {
        return dispatch({
            type: 'logout'
        })
    }, [dispatch]);

    const addUserData = useCallback((newData) => {
        return dispatch({
            type: 'addUserData',
            newData: newData
        })
    }, [dispatch])


    return [appState, login, logout, addUserData]
};