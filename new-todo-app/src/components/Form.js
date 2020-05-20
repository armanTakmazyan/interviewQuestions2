import React, {useState} from 'react';
import uniqid from 'uniqid';

export const Form = (props) => {
    const [inputValue, setInputValue] = useState('');
    const onSubmitFunc = (e) => {
        if(inputValue !== ''){
            props.addItem(uniqid(), inputValue);
        }
    }
    return (
        <div className="toDoApp__form">
            <input type="text" autoComplete="off" className="toDoApp__input" value={inputValue} placeholder="Add text" onChange={(e) => setInputValue(e.target.value)}/>
            <button onClick={onSubmitFunc} className="toDoApp__button">ADD</button>
        </div>
    );
};