import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { boardService } from '../services/board.service';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { utilService } from '../services/util.service';

export const PreFeatureAdd = (props) => {
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
  const board = useSelector((state) => state.boardModule.board);
  const boardId = props.board._id;
  const group = props.group;
  const type = props.type; // group / task
  let activity;

  const [newState, onNewState] = useState({});
  const [isAdding, onIsAdding] = useState(false);

  const onHandleModal = () => {
    onIsAdding(!isAdding);
  };

  const onHandleChange = ({ target }) => {
    const value = target.value;
    onNewState({ title: value });
  };

  const onHandleKeyDown = (ev) => {
    if(ev.keyCode === 13) {
      ev.preventDefault();
      return onAdd();
    }
  }

  const onAdd = async () => {
    if (!newState.title) return; // need to Focus on text area using refs
    if (type === 'group') {
      try {
        const group = { title: newState.title };
        activity = {
          byMember: loggedInUser,
          _id: utilService.makeId(),
          createdAt: Date.now(),
          txt: `added group ${group.title}`,
        };
        await boardService.addGroup(boardId, group, activity);
        await props.onLoadBoard();
      } catch (err) {
        console.log('Cant add new group');
        throw new Error(err);
      }
    } else {
      try {
        const task = { title: newState.title };
        activity = {
          byMember: loggedInUser,
          _id: utilService.makeId(),
          createdAt: Date.now(),
          txt: `added task ${task.title}`,
        };
        await boardService.addTask(boardId, group._id, task, activity);
        await props.onLoadBoard();
      } catch (err) {
        console.log('Cant add new task');
        throw new Error(err);
      }
    }
    onNewState({ title: '' });
    onHandleModal();
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
            onKeyDown={(ev) => onHandleKeyDown(ev)}
              autoFocus
              onChange={onHandleChange}
              rows='5'
              placeholder={`Enter a title for this card... `}></textarea>
          ) : (
            <input
            onKeyDown={(ev) => onHandleKeyDown(ev)}
              autoFocus
              onChange={onHandleChange}
              placeholder='Enter list title...'
            />
          )}
          <div className='new-item-actions flex align-center'>
            {type === 'group' ? (
              <button onClick={onAdd}>Add list</button>
            ) : (
              <button onClick={onAdd}>Add card</button>
            )}
            <a href='#' onClick={onHandleModal}>
              ✕
            </a>
            {type !== 'group' && <MoreHorizIcon style={{ fill: '#6b778c' }} />}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
