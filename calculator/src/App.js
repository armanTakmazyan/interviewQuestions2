import React, { useEffect, useCallback, useReducer, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uniqid from "uniqid";
import "./App.css";

// With parentheses [-0-9()+*/]
// Without parentheses
const calcNumsAndActions = new RegExp("[-0-9+*/]");

const appState = {
  inputValue: "",
  history: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setInputValue":
      let newInputValue;
      if (state.inputValue.toString().includes("Not valid input")) {
        newInputValue = action.inputValue;
      } else {
        if (action.isTyped) {
          newInputValue = action.inputValue;
        } else {
          newInputValue = state.inputValue + action.inputValue;
        }
      }
      return {
        inputValue: newInputValue,
        history: [...state.history]
      };
    case "clearInput":
      return {
        inputValue: "",
        history: [...state.history]
      };
    case "deleteHistoryItem":
      const newHistory = state.history.filter(obj => obj.id !== action.id);
      return {
        inputValue: state.inputValue,
        history: newHistory
      };
    case "resetAppState":
      return {
        inputValue: "",
        history: []
      };
    case "calculate":
      const newHistoryItem = {
        id: uniqid(),
        text:
          action.result === "Not valid input"
            ? action.result
            : `${state.inputValue} = ${action.result}`
      };
      return {
        inputValue: action.result,
        history: [...state.history, newHistoryItem]
      };
    default:
      return state;
  }
};

function useStickyState(defaultValue, key = "appGlobalState") {
  const stickyValue = window.localStorage.getItem(key);

  const initValue =
    stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;

  const [inputAndHistoryState, dispatch] = useReducer(reducer, initValue);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(inputAndHistoryState));
  }, [key, inputAndHistoryState]);

  return [inputAndHistoryState, dispatch];
}

function App() {
  const inputRef = useRef(null);
  const [inputAndHistoryState, dispatch] = useStickyState(appState);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const inputChangeHandler = useCallback(
    e => {
      if (calcNumsAndActions.test(e.target.value)) {
        dispatch({
          type: "setInputValue",
          isTyped: true,
          inputValue: e.target.value
        });
      }
    },
    [dispatch]
  );

  const clearInput = useCallback(
    e => {
      dispatch({
        type: "clearInput"
      });
    },
    [dispatch]
  );

  const deleteHistoryItem = useCallback(
    id => {
      dispatch({
        type: "deleteHistoryItem",
        id: id
      });
    },
    [dispatch]
  );

  const resetAppState = useCallback(() => {
    dispatch({
      type: "resetAppState"
    });
  }, [dispatch]);

  const calculate = useCallback(
    e => {
      console.log("calculate");
      let result = "";
      try {
        result = eval(inputAndHistoryState.inputValue) || "";
      } catch (err) {
        result = "Not valid input";
      }

      dispatch({
        type: "calculate",
        result: result
      });
    },
    [dispatch, inputAndHistoryState]
  );

  const handleUserKeyPress = useCallback(
    event => {
      const { keyCode } = event;
      console.log("handleUserKeyPress");
      if (keyCode === 13) {
        return calculate();
      }
    },
    [calculate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const clickHandler = e => {
    if (e.target.tagName !== "BUTTON") return;
    else if (e.target.classList.contains("calculator__reset-button")) {
      clearInput();
    } else if (e.target.classList.contains("calculator__calculate-button")) {
      calculate();
    } else {
      dispatch({
        type: "setInputValue",
        inputValue: e.target.value
      });
    }
  };

  return (
    <div className="main-wrapper">
      <div className="calculator">
        <input
          value={inputAndHistoryState.inputValue}
          onChange={inputChangeHandler}
          ref={inputRef}
          className="calculator__input"
          type="text"
          placeholder="Expression..."
        />
        <div className="calculator__actions-and-numbers">
          <div
            className="calculator__numbers-reset-calculate"
            onClick={clickHandler}
          >
            <button className="calculator__numbers" value="1">
              1
            </button>
            <button className="calculator__numbers" value="2">
              2
            </button>
            <button className="calculator__numbers" value="3">
              3
            </button>
            <button className="calculator__numbers" value="4">
              4
            </button>
            <button className="calculator__numbers" value="5">
              5
            </button>
            <button className="calculator__numbers" value="6">
              6
            </button>
            <button className="calculator__numbers" value="7">
              7
            </button>
            <button className="calculator__numbers" value="8">
              8
            </button>
            <button className="calculator__numbers" value="9">
              9
            </button>
            <button className="calculator__reset-button">c</button>
            <button className="calculator__numbers" value="0">
              0
            </button>
            <button className="calculator__calculate-button">=</button>
          </div>
          <div className="calculator__actions" onClick={clickHandler}>
            <button value="+">+</button>
            <button value="-">-</button>
            <button value="*">x</button>
            <button value="/">/</button>
          </div>
        </div>
        <div className="calculator__history">
          <button
            className="calculator__history-reset-button"
            onClick={resetAppState}
          >
            Reset History
          </button>
          <h2>History</h2>
          <TransitionGroup>
            {inputAndHistoryState.history.map(obj => {
              return (
                <CSSTransition
                  key={"csst" + obj.id}
                  in={true}
                  classNames={{
                    enter: "fade-enter",
                    enterDone: "fade-enter-done",

                    exit: "fade-exit",
                    exitActive: "fade-exit-active"
                  }}
                  timeout={400}
                >
                  <div key={obj.id} className="calculator__history-item">
                    <p>{obj.text}</p>
                    <button onClick={() => deleteHistoryItem(obj.id)}>X</button>
                  </div>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
}

export default App;
