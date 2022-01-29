import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import { Backdrop } from './UI/backdrop';
import { TaskPreviewMiniMenu } from './task-preview-mini-menu';

export const TaskPreviewHover = (props) => {
  const { task, groupIdx, board, key, index } = props;
  const [taskNewTitle, setTaskNewTitle] = useState(task.title);
  const [isMiniMenuOpened, setIsMenuOpened] = useState(false);

  const dispatch = useDispatch();

  const onHandleMiniMenu = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    setIsMenuOpened(true);
  };

  const onBackDropClick = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (isMiniMenuOpened) {
      const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => {
        return currTask._id === task._id;
      });
      task.title = taskNewTitle;

      if (taskIdx !== -1) board.groups[groupIdx].tasks[taskIdx] = task;
      dispatch({ type: 'SET_BOARD', board });
    }
    setIsMenuOpened(false);
  };

  return (
    <React.Fragment>
      {isMiniMenuOpened && <Backdrop onClick={(ev) => onBackDropClick(ev)} />}
      <button
        onClick={(ev) => onHandleMiniMenu(ev)}
        className='preview-hover-state'>
        <CreateTwoToneIcon
          className='edit-icon'
          sx={{ fontSize: 'medium', color: 'action' }}
        />
      </button>
      {isMiniMenuOpened && (
        <section className='mini-menu-total flex'>
          <div className='mini-menu-preview'>
            <TaskPreviewMiniMenu
              board={board}
              groupIdx={groupIdx}
              key={key}
              task={task}
              groupId={board.groups[groupIdx]._id}
            />
          </div>
          <div className='mini-menu-options'>
            <h4>Hi asd asd asd asd asd asd asd</h4>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};
