import React, {useEffect, useReducer, useState, useCallback} from 'react';
import uniqid from 'uniqid';
import './App.css';
import { Form } from './components/Form'
import { Lists } from './components/Lists';


let initialState = [
  {
    id: "text",
    text: "text"
  },
  {
    id: "someText",
    text: "someText"
  },
  {
    id: "dvb",
    text: "someText"
  }
];

const reducer = (state, action) => {
  switch (action.type){
    case "add":
        return [...state, {id: action.id, text: action.text}]
    case "del":
      return state.filter(obj => obj.id !== action.id)    
    default:
      return state;
  }
};

function useStickyState(defaultValue, key = 'toDoApp') {
  const stickyValue = window.localStorage.getItem(key);

  const initValue = stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;

  const [state, dispatch] = useReducer(reducer, initValue);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
}

function App() {
  const [state, dispatch] = useStickyState(initialState, 'toDoApp');
  const [inputValue, setInputValue] = useState('');

  const addItem = useCallback((id, text) => {
    dispatch({ type: "add", id, text});
  },[dispatch]);

  const onSubmitFunc = useCallback((e) => {
    if(inputValue !== ''){
        addItem(uniqid(), inputValue);
    }
  }, [addItem, inputValue])

  const handleUserKeyPress = useCallback(event => {
    const { keyCode } = event;

    if (keyCode === 13) {
      return onSubmitFunc();
    }
  }, [onSubmitFunc]);

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };

  }, [handleUserKeyPress]);

  const deleteItem = (id) => {
    dispatch({ type: "del", id });
  };

  return (
    <div className="main-wrapper">
      <div className="toDoApp">
        <div className="toDoApp__inner">
          <Form addItem={addItem} onSubmitFunc={onSubmitFunc} inputValue={inputValue} setInputValue={setInputValue}/>
          <Lists state={state} deleteItem={deleteItem}/>
        </div>
      </div>
    </div>
  );
}

export default App;
