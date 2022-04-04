import React, {useEffect, useState } from 'react';
import { Backdrop } from '../UI/backdrop';
import { TaskPreviewMiniMenu } from './task-preview-mini-menu';
import { TaskPreviewPortal } from './task-preview-portal';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export const TaskPreviewHover = (props) => {
  console.log('I returned here', props);

  const history = useHistory()
  const board = useSelector((state) => state.boardModule.board);
  if (!props) history.push(`/b/${board._id}`);
  const { taskPos, groupIdx } = props.previewTask;
  const [task, setTask] = useState(props.previewTask.task)
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => {
    return (currTask._id === task._id);
  })
  const [taskNewTitle, setTaskNewTitle] = useState(task.title);

  const dispatch = useDispatch()

  useEffect(() => {
    setTask(board.groups[groupIdx].tasks[taskIdx])
  }, [board])


  const onBackDropClick = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    props.setPos(null);
  };

  const handleTitleChange = () => {
    // task.title = taskNewTitle;
    // board.groups[groupIdx].tasks[taskIdx] = task;
    // const action = {type: 'SET_BOARD', board};
    // dispatch(action)
    props.setPos(null);
  }


  const taskPosition = {
    position: 'absolute',
    top: taskPos.top + 'px',
    left: taskPos.left + 'px',
    width: taskPos.width + 'px',
    height: taskPos.height + 'px',
    // minHeight: '2rem'
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
        <section className='mini-menu-preview flex column'>
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
        onLoadBoard={props.onLoadBoard}
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
