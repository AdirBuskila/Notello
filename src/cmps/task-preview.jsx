import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import { Link } from 'react-router-dom';
import { Card } from '../cmps/UI/Card';

export const TaskPreview = ({ task }) => {
  const isLabelsExpended = useSelector(
    (state) => state.boardModule.isLabelsExpended
  );
  const dispatch = useDispatch();

  const onHandleLablesClick = (ev) => {
    ev.preventDefault();
    dispatch({ type: 'HANDLE_LABELS' });
  };

  return (
    <Link key={task._id} to={`/c/${task._id}`}>
      <Card key={task._id} className='task flex column'>
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
      </Card>
    </Link>
  );
};
