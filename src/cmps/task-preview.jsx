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

  const onHandleLablesClick = (ev) => {
    ev.preventDefault();
    const className = ev.target.className;
    dispatch({ type: 'HANDLE_LABELS', className });
  };

  const className = isLabelsExpended ? 'expended flex align-center' : 'flex align-center';

  return (
    <React.Fragment>
      <Link key={task._id} to={`/c/${task._id}`}>
        <Draggable key={props.index} draggableId={task._id} index={props.index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              className='task-preview flex column'
              key={task._id}>
              {task.labels && (
                <ul className='labels flex'>
                  {task.labels.map((label, idx) => {
                    return (
                      <li
                        className={className}
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
          )}
        </Draggable>
      </Link>
    </React.Fragment>
  );
};
