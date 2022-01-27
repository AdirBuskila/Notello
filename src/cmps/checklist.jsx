import React, { useState } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBoxOutlined';
import { LinearWithValueLabel } from '../cmps/progress-bar';
import { CheckListSection } from '../cmps/check-list-section';
import { CheckListDelete } from './check-list-delete';

import { utilService } from '../services/util.service';

export const CheckList = (props) => {
  const { task, taskIdx, groupIdx, checklistIdx, board, checklist } = props;
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
  const [currTodoId, setCurrTodoId] = useState('');
  const [isChanging, setIsChanging] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();

  const handleCheckBoxClick = async (todoId) => {
    const todoIdx = task.checklists[checklistIdx].todos.findIndex((td) => {
      return td._id === todoId;
    });
    let { isDone } = task.checklists[checklistIdx].todos[todoIdx];
    const state = isDone ? 'Done' : 'In work';
    const activity = {
      _id: utilService.makeId(),
      txt: `changed todo (${checklist.todos[todoIdx].title}) state to - ${state}`,
      createdAt: Date.now(),
      byMember: loggedInUser,
      task: {
        _id: task._id,
        title: task.title,
      },
    };
    try {
      board.activities.unshift(activity);
      task.checklists[checklistIdx].todos[todoIdx].isDone = !isDone;
      board.groups[groupIdx].tasks[taskIdx] = task;
      const action = { type: 'SET_BOARD', board };
      await dispatch(action);
    } catch (err) {
      console.log('Cant change todo state', err);
    }
  };

  const getProgressValue = () => {
    return checklist.todos.reduce((acc, t) => {
      t.isDone ? (acc += 100 / checklist.todos.length) : (acc += 0);
      return acc;
    }, 0);
  };

  if (!checklist) return <></>;
  return (
    <div className='checklist-container'>
      <div className='checklist-header flex align-center'>
        <AssignmentTurnedInOutlinedIcon className='header-icon' />
        <section className='checklist-header-title flex align-center space-between'>
          <p>{checklist.title}</p>
          <div className='flex end'>
            <CheckListDelete
              checklistIdx={checklistIdx}
              board={board}
              task={task}
              taskIdx={taskIdx}
              groupIdx={groupIdx}
              checklist={checklist}
            />
          </div>
        </section>
      </div>
      <LinearWithValueLabel value={getProgressValue()} />
      <div className='checkbox-info flex column'>
        {checklist.todos.map((td, index) => {
          return (
            <div key={index} className='individual-checklist flex'>
              {/* Add class self-top when textarea is open */}
              <div
                className='flex'
                onClick={() => {
                  handleCheckBoxClick(td._id);
                }}>
                {!td.isDone ? (
                  <CheckBoxOutlineBlankOutlinedIcon className='checkbox' />
                ) : (
                  <CheckBoxIcon className='checkbox' />
                )}
              </div>
              {isChanging && currTodoId === td._id ? (
                <CheckListSection
                  isChanging={isChanging}
                  setIsAdding={setIsAdding}
                  type={'oldTodo'}
                  todo={td}
                  checklistIdx={checklistIdx}
                  setIsChanged={props.setIsChanged}
                  board={board}
                  task={task}
                  taskIdx={taskIdx}
                  groupIdx={groupIdx}
                  todoIdx={index}
                  setIsChanging={setIsChanging}
                />
              ) : (
                <div
                  className='todo-title'
                  onClick={() => {
                    setCurrTodoId(td._id);
                    setIsChanging(true);
                  }}>
                  {td.isDone ? (
                    <p style={{ color: '#5e6c84' }} className='line-through'>
                      {td.title}
                    </p>
                  ) : (
                    <p>{td.title}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      {!isAdding ? (
        <button onClick={() => setIsAdding(true)} className='last-btn'>
          Add an item
        </button>
      ) : (
        <CheckListSection
          type={'newTodo'}
          checklistIdx={checklistIdx}
          setIsAdding={setIsAdding}
          board={board}
          task={task}
          taskIdx={taskIdx}
          groupIdx={groupIdx}
        />
      )}
    </div>
  );
};
