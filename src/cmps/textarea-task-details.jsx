import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const Textarea = (props) => {
  const [newState, onNewState] = useState({});
  const [isAdding, onIsAdding] = useState(false);

  const onHandleModal = () => {
    onIsAdding(!isAdding);
  };

  const onHandleChange = ({ target }) => {
    const value = target.value;
    onNewState(value);
  };

  const onAdd = ({ target }) => {
    console.log(target);
  };

  return (
    <React.Fragment>
      {!isAdding && (
        <button
          className='add-description flex align-center'
          onClick={onHandleModal}
        >
          <p> Add more Description...</p>
        </button>
      )}
      {isAdding && (
        <div className='new-item flex column'>
          <textarea
            autoFocus
            onChange={onHandleChange}
            rows='5'
            placeholder={`Enter a title for this card... `}
          ></textarea>
          <div className='new-item-actions flex align-center'>
            <button onClick={onAdd}>Add Description</button>
            <a href='#' onClick={onHandleModal}>
              ✕
            </a>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
