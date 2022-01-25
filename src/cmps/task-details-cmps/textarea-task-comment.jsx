import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';

export const Textarea1 = (props) => {
  const [newState, onNewState] = useState({ text: '' });
  const [isAdding, onIsAdding] = useState(false);

  const onHandleModal = () => {
    console.log(newState);
    onIsAdding(!isAdding);
  };

  const onCloseModal = () => {
    console.log(newState.text);
    if (newState.text !== '') return;
    onHandleModal();
  };

  const onHandleChange = ({ target }) => {
    const value = target.value;
    onNewState({
      text: value,
    });
  };

  const onAdd = (ev) => {
    ev.preventDefault();
    console.log(ev.target);
    onNewState({
      text: '',
    });
  };

  return (
    <React.Fragment>
      {!isAdding && (
        <textarea
          rows='2'
          placeholder='Write a comment...'
          className='add-comment flex align-center'
          onClick={onHandleModal}></textarea>
      )}
      {isAdding && (
        <div className='new-comment flex column'>
          <textarea
            autoFocus
            // onBlurCapture={onCloseModal}
            onChange={onHandleChange}
            rows='3'
            defaultValue={newState.text}
            placeholder={`Add a more detailed comment `}></textarea>
          <div className='new-comment-actions flex align-center'>
            <Button
              onClick={(ev) => {
                onAdd(ev);
              }}
              variant='contained'
              // sx={{
              //   textTransform: 'none',
              //   minWidth: 52.5,
              //   backgroundColor: '#091e420a',
              //   '&:hover': {
              //     color: 'red',
              //     backgroundColor: 'white',
              //   },
              // }}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
