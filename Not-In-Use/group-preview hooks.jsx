import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Card } from '../UI/Card';
import { TaskPreview } from '../task-preview';
import { loadBoard } from '../../store/actions/board.action';
import { boardService } from '../../services/board.service';

const _GroupPreview = (props) => {
  const [isAdding, onIsAdding] = useState();
  const [newTask, onNewTask] = useState([]);
  const [tasks, onSetTasks] = useState([props.group.tasks]);

  const loadTasks = async () => {
    await this.props.onLoadBoard();
    const { tasks } = props.group;
    this.setState({ tasks });
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
      // await this.props.addTask(boardId, groupId, newTask);
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
    <div className='flex column'>
      <div className='task-list-container flex column'>
        {tasks.map((task) => {
          return <TaskPreview key={task._id} task={task}></TaskPreview>;
        })}
      </div>
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
