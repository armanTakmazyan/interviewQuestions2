import React, { useState } from 'react';
import uniqid from 'uniqid';
import './App.css';

function App() {
  
  const [historyValue, setHistoryValue] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const calculate = (e) => {
    setInputValue(prevInputState => {
      let result = '';
       try {
         result = (eval(prevInputState));
         setHistoryValue(prev => {
          return [...prev, `${prevInputState === 'Not valid input' ? '' : prevInputState} = ${result}`];
         })
         return result;
       } catch (err) {
        setHistoryValue(prev => {
          return [...prev, 'Not valid input']
        });
         return 'Not valid input';
       }
   });
  };

  const clearHistory = (e) => {
    setHistoryValue([]);
  };

  const clearInput = (e) => {
    setInputValue('');
  };

  const clearButtonHandler = () => {
    clearHistory();
    clearInput();
  };


  const clickHandler = (e) => {
    if(e.target.tagName !== 'LI') return;
    const newValue = e.target.getAttribute('data-value');
    setInputValue(prev => {
      if(prev.toString().includes("Not valid input")){
        return newValue;
      }else {
        return prev + newValue;
      }
    })
  }

  return (
    <div className="mainWrapper">
      <div className='calculator'>
        <div className='calculator__form'>
          <div className="calculator__form-inner">
            <input type="text" className="calculator__form-input" value={inputValue} onChange={inputChangeHandler} placeholder="Expression..."/>
            <button className="calculator__form-button" onClick={calculate}>=</button>
          </div>
        </div>
        <div className='calculator__numbers-actions'>
            <div className="calculator__numbers-actions-inner">
              <ul className='calculator__numbers-list' onClick={clickHandler}>
                <li data-value="0">0</li>
                <li data-value="1">1</li>
                <li data-value="2">2</li>
                <li data-value="3">3</li>
                <li data-value="4">4</li>
                <li data-value="5">5</li>
                <li data-value="6">6</li>
                <li data-value="7">7</li>
                <li data-value="8">8</li>
                <li data-value="9">9</li>
                <li data-value=".">.</li>
            </ul>
            </div>
           <div className="calculator__actions" onClick={clickHandler}>
              <ul>
                <li data-value="*">*</li>
                <li data-value="%">%</li>
                <li data-value="/">/</li>
                <li data-value="-">-</li>
                <li data-value="+">+</li>
                <button className="calculator__clear-button" onClick={clearButtonHandler}>Clear</button>
              </ul>
           </div>
        </div>
        <div className="calculator__history">
          <h2>History</h2>

          {
            historyValue.map(text => {
              return <p key={uniqid()} className="calculator__history-item">{text}</p>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
