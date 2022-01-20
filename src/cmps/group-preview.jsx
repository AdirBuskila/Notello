import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { Card } from './UI/Card';
import { PreFeatureAdd } from './preFeatureAdd';
import { TaskList } from './task-list';
import { loadBoard } from '../store/actions/board.action';
import { boardService } from '../services/board.service';

const _GroupPreview = (props) => {
  const { group, board } = props;
  const groupIdx = boardService.getGroupIdxById(props.board, props.group._id);
  const storeTasks = props.board.groups[groupIdx].tasks;
  const [isAdding, onIsAdding] = useState();
  const [newTask, onNewTask] = useState({});
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

  return (
    <div className='group-container flex column'>
      <div className='group-header flex'>
        <h4>{group.title}</h4>
      </div>
      {tasks && <TaskList groupId={props.group._id} tasks={tasks} />}
      <PreFeatureAdd
        onLoadBoard={props.onLoadBoard}
        board={board}
        group={group}
        type='task'
      />
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
