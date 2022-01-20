
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';

import { Card } from './UI/Card';
import { TaskList } from './task-list'
import { loadBoard } from '../store/actions/board.action';
import { boardService } from '../services/board.service';

const _GroupPreview = (props) => {
  const groupIdx = boardService.getGroupIdxById(props.board, props.group._id)
  const tasks = props.board.groups[groupIdx].tasks
  const [isAdding, onIsAdding] = useState();
  const [newTask, onNewTask] = useState([]);

  // const [tasks, onUpdateTasks] = useState([])
  
  // useEffect(() => {
  //     // await props.onLoadBoard()
  //     const groupIdx = boardService.getGroupIdxById(props.board, props.group._id)
  //     const tasks = props.board.groups[groupIdx].tasks
  //     onUpdateTasks(tasks)
  // }, [])

  const loadTasks = async () => {
    await props.onLoadBoard();
  };

  const onHandleNewCardState = () => {
    onIsAdding(!isAdding);
  };

  const onHandleChange = ({ target }) => {
    const value = target.value;
    onNewTask({ title: value });
  };

  const onAddCard = async () => {
    const { group, board } = props;
    try {
      await boardService.addTask(board._id, group._id, newTask);
      onNewTask({ title: '' });
      loadTasks();
    } catch (err) {
      console.log('Cant add new task');
      throw new Error(err);
    }
    onHandleNewCardState();
  };

  if (!tasks || tasks.length === 0)
    return (
      <Card className='task flex column'>
        <button>+ Add a list</button>
      </Card>
    );
  return (
    <div className='group-container flex column'>
      <TaskList tasks={tasks} />
      {!isAdding && (
        <button onClick={onHandleNewCardState}>+ Add a card</button>
      )}
      {isAdding && (
        <div className='new-card flex column'>
          <textarea
            onChange={onHandleChange}
            name='add-card'
            rows='5'
            placeholder='Enter a title for this card...'></textarea>
          <div className='new-card-actions'>
            <button onClick={onAddCard}>Add card</button>
            <a href='#' onClick={onHandleNewCardState}>
              ✕
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

function mapStateToProps({ boardModule }) {
  return {
    board: boardModule.board,
  };
}

const mapDispatchToProps = {
  loadBoard,
};

export const GroupPreview = connect(
  mapStateToProps,
  mapDispatchToProps
)(_GroupPreview);


{/* <Droppable droppableId={this.props.group._id}>
  {(provided) => (
    <div className='task-list-container flex column'
      innerRef={provided.innerRef}
      {...provided.droppableProps}>
      {tasks.map((task, index) => {
        return <Task key={task._id} index={index} task={task}></Task>;
      })}
      {provided.placeholder}
    </div>
  )}
</Droppable> */}