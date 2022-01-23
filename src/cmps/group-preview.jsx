import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { PreFeatureAdd } from './preFeatureAdd';
import { TaskList } from './task-list';
import { loadBoard } from '../store/actions/board.action';
import { boardService } from '../services/board.service';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import { Card } from './UI/Card';
// import { cardActionAreaClasses } from '@mui/material';

const _GroupPreview = (props) => {
  const { group, board } = props;
  const groupIdx = boardService.getGroupIdxById(props.board, props.group._id)
  console.log('groupppppppp:' , groupIdx)
  console.log("props.board.groups[groupIdx]: ", props.board.groups[groupIdx]);
  const storeTasks = props.board.groups[groupIdx].tasks;
  const [tasks, onUpdateTasks] = useState(storeTasks);
  const [clickedGroupId, setClickedGroupId] = useState('');
  const [newGroupTitle, setNewGroupTitle] = useState('');

  useEffect(() => {
    const groupIdx = boardService.getGroupIdxById(props.board, props.group._id);
    const tasks = props.board.groups[groupIdx].tasks;
    onUpdateTasks(tasks);
  }, [storeTasks]);

  const handleNewTitle = async () => {
    if (!newGroupTitle) return setClickedGroupId('');
    const groupIdx = boardService.getGroupIdxById(board, clickedGroupId);
    const newBoard = board;
    newBoard.groups[groupIdx].title = newGroupTitle;
    setClickedGroupId('');
    setNewGroupTitle('');
    await boardService.saveBoard(newBoard);
  };

  const className = clickedGroupId
    ? 'group-header flex input'
    : 'group-header flex ';

  return (
    <Draggable
      draggableId={group._id}
      index={props.index}
      type='list'
      key={group._id}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div
            onBlur={handleNewTitle}
            {...provided.dragHandleProps}
            className='group-container flex column'>
            <div
              onClick={() => setClickedGroupId(group._id)}
              className={className}>
              {!clickedGroupId && <h4>{group.title}</h4>}
              {group._id === clickedGroupId ? (
                <input
                  autoFocus
                  onChange={(ev) => {
                    setNewGroupTitle(ev.target.value);
                  }}
                  defaultValue={group.title}></input>
              ) : null}
              <MoreHorizIcon style={{ fill: '#6b778c' }} />
            </div>

            <Droppable
              droppableId={group._id}
              index={props.index}
              key={props.index}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <TaskList
                  onLoadBoard={props.onLoadBoard}
                    groupIdx={groupIdx}
                    groupId={group._id}
                    tasks={tasks}
                  />
                  <div style={{ height: '5px' }}></div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <PreFeatureAdd
              onLoadBoard={props.onLoadBoard}
              board={board}
              group={group}
              type='task'
            />
          </div>
        </div>
      )}
    </Draggable>
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
