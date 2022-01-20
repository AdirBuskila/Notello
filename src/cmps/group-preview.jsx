import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { Card } from './UI/Card';
import { TaskList } from './task-list';
import { loadBoard } from '../store/actions/board.action';
import { boardService } from '../services/board.service';

const _GroupPreview = (props) => {
  const { group, board } = props;
  const groupIdx = boardService.getGroupIdxById(props.board, props.group._id);
  const storeTasks = props.board.groups[groupIdx].tasks;
  const [isAdding, onIsAdding] = useState();
  const [newTask, onNewTask] = useState([]);
  const [tasks, onUpdateTasks] = useState([storeTasks]);

  useEffect(() => {
    // await props.onLoadBoard()
    const groupIdx = boardService.getGroupIdxById(props.board, props.group._id);
    const tasks = props.board.groups[groupIdx].tasks;
    onUpdateTasks(tasks);
  }, [storeTasks]);

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
        {/* <button>+ Add a list</button> */}
        <button>+ Add a list</button>
      </Card>
    );
  return (
    <div className='group-container flex column'>
      <div className='group-header flex'>
        <h4>{group.title}</h4>
      </div>
      <TaskList groupId={props.group._id} tasks={tasks} />
      {!isAdding && (
        <div className='add-card-container'>
          <button onClick={onHandleNewCardState}>+ Add a card</button>
        </div>
      )}
      {isAdding && (
        <div className='new-card flex column'>
          <textarea
            onChange={onHandleChange}
            name='add-card'
            rows='5'
            placeholder='Enter a title for this card...'></textarea>
          <div className='new-card-actions flex'>
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
