import React, {useEffect, useRef} from 'react';

export const Form = ({ inputValue, setInputValue, onSubmitFunc }) => {
    const inputRef = useRef();
    useEffect(() => {
      inputRef.current.focus();
    },[]);

    return (
        <div className="toDoApp__form">
            <input ref={inputRef} type="text" autoComplete="off" className="toDoApp__input" value={inputValue} placeholder="Add text" onChange={(e) => setInputValue(e.target.value)}/>
            <button onClick={onSubmitFunc} className="toDoApp__button">ADD</button>
        </div>
    );
};