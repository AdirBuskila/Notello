import React, {useEffect, useState } from 'react';
import { Backdrop } from './UI/backdrop';
import { TaskPreviewMiniMenu } from './task-preview-mini-menu';
import { TaskPreviewPortal } from './task-preview-portal';
import { useSelector, useDispatch } from 'react-redux';

export const TaskPreviewHover = (props) => {
  const board = useSelector((state) => state.boardModule.board);
  const { taskPos, task, groupIdx } = props.previewTask;
  const taskIdx = board.groups[groupIdx].tasks.find((currTask) => {
    return (currTask._id === task._id)
  })
  const [taskNewTitle, setTaskNewTitle] = useState(task.title);

  const dispatch = useDispatch()
  // const [board, setBoard] = useState(props.board);

  useEffect(() => {
    props.onLoadBoard()
  }, [board]);

  const onBackDropClick = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    props.setPos(null);
  };

  const handleTitleChange = () => {
    // task.title = taskNewTitle;
    // board.groups[groupIdx].tasks[taskIdx] = task;
    // dispatch({type: 'SET_BOARD', board})
    props.setPos(null);
  }

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
          setTaskNewTitle={setTaskNewTitle}
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
        <button onClick={handleTitleChange} className='save-btn' style={buttonPosition}>
          Save
        </button>
      </div>
    </React.Fragment>
  );
};
