import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import { Link } from 'react-router-dom';
import { Card } from '../cmps/UI/Card';

export const TaskPreview = (props) => {
  const task = props.task;
  const dispatch = useDispatch();
  const isLabelsExpended = useSelector(
    (state) => state.boardModule.isLabelsExpended
    );

  const [isDragging, onSetDragging] = useState(false)
  const {taskIdx, groupIdx} = props;
  const dragTask = useRef()
  const dragNode = useRef()
  

  const onHandleLablesClick = (ev) => {
    ev.preventDefault();
    dispatch({ type: 'HANDLE_LABELS' });
  };

  const handleDragStart = (ev, params) => {
    console.log('drag starting', params);
    dragTask.current = params;
    dragNode.current = ev.target;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    // dragNode.current.addEventListener('dragenter', handleDragEnd);
    setTimeout(() => {
      onSetDragging(true)
    }, 0)
  }

  const handleDragEnd = () => {
    console.log('ending drag..');
    onSetDragging(false);
    dragNode.current.removeEventListener('dragend', handleDragEnd);
    dragTask.current = null;
    dragNode.current = null;
  }

  const handleDragEnter = (ev, params) => {
    console.log('Entering drag', params);
  }

  const getStyles = (params) => {
    const currentTask = dragTask.current;
    if (currentTask.groupIdx === params.groupIdx && currentTask.taskIdx === params.taskIdx) {
      return ' current'
    }
  }

  return (
    <Link key={task._id} to={`/c/${task._id}`}>
      <div
      className={isDragging ? getStyles({groupIdx, taskIdx}) : 'task flex column'}
      onDragStart={(ev) => handleDragStart(ev, {groupIdx, taskIdx})}
      onDragEnter={isDragging ? (ev) => {handleDragEnter(ev, {groupIdx, taskIdx})} : null}
      key={task._id} 
      draggable="true"
      >
        {task.labels && (
          <ul className='labels flex'>
            {task.labels.map((label, idx) => {
              return (
                <li
                  onClick={(ev) => onHandleLablesClick(ev)}
                  key={idx}
                  style={{ backgroundColor: `${label.bgc}` }}>
                  {isLabelsExpended && `${label.name}`}
                </li>
              );
            })}
          </ul>
        )}
        <p>{task.title}</p>
      </div>
    </Link>
  );
};
