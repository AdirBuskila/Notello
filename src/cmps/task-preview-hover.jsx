import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import { Backdrop } from './UI/backdrop';
import { TaskPreviewMiniMenu } from './task-preview-mini-menu';
import { TaskPreviewPortal } from './task-preview-portal';
import ReactDOM from 'react-dom';

export const TaskPreviewHover = (props) => {
  const { task, groupIdx, board, key, setPreview } = props;
  const [pos, setPos] = useState({});
  const [taskNewTitle, setTaskNewTitle] = useState(task.title);
  const [isMiniMenuOpened, setIsMenuOpened] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const onHandleMiniMenu = (ev) => {
    console.log('EV', ev);
    ev.preventDefault();
    ev.stopPropagation();
    const pos = {
        x: ev.clientX + 15,
        y: ev.clientY - 15
    }
    setPreview(pos)
    setPos(pos);
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
    setPreview(null)
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
        <div>
          <section className='mini-menu-preview'>
            <TaskPreviewMiniMenu
              board={board}
              groupIdx={groupIdx}
              task={task}
              groupId={board.groups[groupIdx]._id}
            />
          </section>
          {/* {ReactDOM.createPortal(
            <TaskPreviewPortal pos={pos} />,
            document.getElementById('task-portal')
          )} */}
        </div>
      )}
    </React.Fragment>
  );
};
