import React, { useState, useEffect } from 'react';
import { boardService } from '../services/board.service';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const PreFeatureAdd = (props) => {
  const boardId = props.board._id;
  const group = props.group;
  const type = props.type; // group / task

  const [newState, onNewState] = useState({});
  const [isAdding, onIsAdding] = useState(false);

  const onHandleModal = () => {
    onIsAdding(!isAdding);
  };

  const onHandleChange = ({ target }) => {
    const value = target.value;
    onNewState({ title: value });
  };

  const onAdd = async () => {
    if (!newState.title) return; // need to Focus on text area using refs
    if (type === 'group') {
      try {
        const group = { title: newState.title };
        const activity = `New group added at ${Date.now()}`;
        await boardService.addGroup(boardId, group, activity);
      } catch (err) {
        console.log('Cant add new group');
        throw new Error(err);
      }
    } else {
      try {
        const task = { title: newState.title };
        const activity = `New task added at ${Date.now()}`;
        await boardService.addTask(boardId, group._id, task, activity);
      } catch (err) {
        console.log('Cant add new task');
        throw new Error(err);
      }
    }
    onNewState({ title: '' });
    onHandleModal();
    props.onLoadBoard();
  };

  return (
    <React.Fragment>
      {!isAdding && (
        <div className='add-item'>
          {type === 'group' ? (
            <button
              className='add-list flex align-center'
              onClick={onHandleModal}>
              <span></span> <p> Add another list</p>
            </button>
          ) : (
            <button
              className='add-card flex align-center'
              onClick={onHandleModal}>
              <span></span> Add a card
            </button>
          )}
        </div>
      )}
      {isAdding && (
        <div className='new-item flex column'>
          {props.type !== 'group' ? (
            <textarea
              onChange={onHandleChange}
              rows='5'
              placeholder={`Enter a title for this card... `}></textarea>
          ) : (
            <input
              onChange={onHandleChange}
              placeholder='Enter list title...'
            />
          )}
          <div className='new-item-actions flex align-center'>
            {type === 'group' ? (
              <button onClick={onAdd}>Add list</button>
            ) : (
              <React.Fragment>
                <button onClick={onAdd}>Add card</button>
                <MoreHorizIcon style={{ fill: '#6b778c' }} />
              </React.Fragment>
            )}
            <a href='#' onClick={onHandleModal}>
              ✕
            </a>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
