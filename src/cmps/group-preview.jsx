import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { PreFeatureAdd } from './preFeatureAdd';
import { TaskList } from './task-list';
import { loadBoard } from '../store/actions/board.action';
import { boardService } from '../services/board.service';
import { Draggable, Droppable } from 'react-beautiful-dnd';

// import { Card } from './UI/Card';
// import { cardActionAreaClasses } from '@mui/material';

const _GroupPreview = (props) => {
  const { group, board } = props;
  const groupIdx = boardService.getGroupIdxById(props.board, props.group._id);
  console.log("groupIdx: ", groupIdx);
  const storeTasks = props.board.groups[groupIdx].tasks;
  const [tasks, onUpdateTasks] = useState([storeTasks]);


  useEffect(() => {
    // await props.onLoadBoard()
    const groupIdx = boardService.getGroupIdxById(props.board, props.group._id);
    const tasks = props.board.groups[groupIdx].tasks;
    onUpdateTasks(tasks);
  }, [storeTasks]);

  return (
    <Draggable draggableId={group._id} index={props.index} key={props.index}>
      {(provided) => (
        <div {...provided.draggableProps}
          ref={provided.innerRef}>
          <div
            {...provided.dragHandleProps}
            className='group-container flex column'>
            <div className='group-header flex'>
              <h4>{group.title}</h4>
            </div>
            <Droppable droppableId={group._id} index={props.index} key={props.index}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <TaskList
                    groupIdx={groupIdx}
                    groupId={props.group._id}
                    tasks={tasks} />
                  <div style={{ height: '5px' }}></div>
                  {provided.placeholder}
                </div>)}
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