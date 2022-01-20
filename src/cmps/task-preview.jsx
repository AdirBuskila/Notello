/*const initialState = {
  tasks: {
    'task-1': { _id: 'task-1', content: 'This is a dragabble task'}
  },
  columns: { 
    'group-1': {
      _id: 'group-1', title: 'This is a dropabble group', taskIds: ['task-1', 'task-2', ...]
    }
  },
  columnOrder: ['group-1'],
} */

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Link } from 'react-router-dom';
import { Card } from '../cmps/UI/Card';

export class TaskPreview extends React.Component {
  state = {};

  render() {
    const { task } = this.props;
    return (
      <div>
        <Link key={task._id} to={`/c/${task._id}`}>
          {/* <Draggable draggableId='task._id' index={this.props.index}>
            {(provided) => ( */}
          <Card
            key={task._id}
            className='task flex column'
            // {...provided.draggableProps}
            // {...provided.dragHandleProps}
            // innerRef={provided.innerRef}>
          >
            <p>{task.title}</p>
            {task.labels && (
              <ul className='flex'>
                {task.labels.map((label, idx) => {
                  return (
                    <li key={idx} style={{ backgroundColor: `${label.bgc}` }}>
                      {label.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
          {/* )} </Draggable> */}
        </Link>
      </div>
    );
  }
}
