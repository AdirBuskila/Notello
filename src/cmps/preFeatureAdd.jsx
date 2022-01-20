import React, { useState, useEffect } from 'react';
import { boardService } from '../services/board.service';

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
    if (!newState.title) return; // add modal
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
        <>
          {type === 'group' ? (
            <button className='add-list' onClick={onHandleModal}>
              <span>+</span> Add another list
            </button>
          ) : (
            <button className='add-card' onClick={onHandleModal}>
              <span>+</span> Add a card
            </button>
          )}
        </>
      )}
      {isAdding && (
        <div className='new-item flex column'>
          <textarea
            onChange={onHandleChange}
            rows='5'
            placeholder={`Enter a title for this ${type}...`}></textarea>
          <div className='new-item-actions flex'>
            {type === 'group' ? (
              <button onClick={onAdd}>Add list</button>
            ) : (
              <button onClick={onAdd}>Add card</button>
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
