import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CreateTwoToneIcon from '@mui/icons-material/CreateTwoTone';
import { Backdrop } from './UI/backdrop';
import { TaskPreviewMiniMenu } from './task-preview-mini-menu';
import { TaskPreviewPortal } from './task-preview-portal';
import ReactDOM from 'react-dom';

export const TaskPreviewHover = (props) => {
  const { taskPos, task, groupIdx } = props.previewTask;
  const { board } = props;
  //   const [taskNewTitle, setTaskNewTitle] = useState(task.title);

  const dispatch = useDispatch();

  const onBackDropClick = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    props.setPos(null);
  };

  const taskPosition = {
    position: 'absolute',
    top: taskPos.top + 'px',
    left: taskPos.left + 'px',
    width: taskPos.width + 'px',
    height: taskPos.height + 'px',
  };

  const buttonPosition = {
    position: 'absolute',
    top: taskPos.top + taskPos.height + 15 + 'px',
    left: taskPos.left + 'px',
  };

  const portalPosition = {
    position: 'absolute',
    top: taskPos.top + 'px',
    left: taskPos.left + taskPos.width + 15 + 'px',
  }

  return (
    <React.Fragment>
      <Backdrop onClick={(ev) => onBackDropClick(ev)} />
      <div>
        <section className='mini-menu-preview'>
          <TaskPreviewMiniMenu
            board={board}
            key={task._id}
            groupIdx={groupIdx}
            task={task}
            groupId={board.groups[groupIdx]._id}
            taskPosition={taskPosition}
            setPos={props.setPos}
          />

        <TaskPreviewPortal
        board={board}
        key={board.groups[groupIdx]._id}
        groupIdx={groupIdx}
        task={task}
        groupId={board.groups[groupIdx]._id}
        setPos={props.setPos}
        portalPosition={portalPosition} />

        </section>
        <button className='save-btn' style={buttonPosition}>
          Save
        </button>
      </div>
    </React.Fragment>
  );
};
