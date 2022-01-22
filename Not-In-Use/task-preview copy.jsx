import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import { Link } from 'react-router-dom';
import { Card } from '../src/cmps/UI/Card';

export const TaskPreview = (props) => {
  const task = props.task;
  const dispatch = useDispatch();
  const isLabelsExpended = useSelector(
    (state) => state.boardModule.isLabelsExpended
  );

  const { taskIdx, groupIdx } = props;


  const onHandleLablesClick = (ev) => {
    ev.preventDefault();
    dispatch({ type: 'HANDLE_LABELS' });
  };

  return (
      <Link
        key={task._id} to={`/c/${task._id}`}>
        <div
          className='task flex column'
          key={task._id}
          taskIdx={taskIdx}
          groupIdx={groupIdx}
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