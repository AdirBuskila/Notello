import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';


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
          className='add-description flex'
          onClick={onHandleModal}
        >
          <p>Add a more detailed description</p>
        </button>
      )}
      {isAdding && (
        <div className='new-description flex column'>
          <textarea
            autoFocus
            onChange={onHandleChange}
            rows='4'
            placeholder={`Add a more detailed description `}
          ></textarea>
          <div className='new-description-actions flex align-center'>
            <Button 
            onClick={onAdd}
            variant='contained'
            >Save</Button>
            <a href='#' onClick={onHandleModal}>
              ✕
            </a>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
