import React from 'react';

export const Lists = ( {  state, deleteItem }) => {
    return (
        <div className="toDoApp__lists">
            {
                state.map(obj => (
                    <div className="toDoApp__list" key={obj.id}>
                        <span>{obj.text}</span>
                        <button onClick={e => deleteItem(obj.id)} className="toDoApp__close-button">X</button>
                    </div>
                ))
            }
        </div>
    );
};