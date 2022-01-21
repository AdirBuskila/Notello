import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { PreFeatureAdd } from './preFeatureAdd';
import { TaskList } from './task-list';
import { loadBoard } from '../store/actions/board.action';
import { boardService } from '../services/board.service';
import { Droppable } from 'react-beautiful-dnd';
import { dragAndDropService } from '../services/drag-and-drop';

// import { Card } from './UI/Card';
// import { cardActionAreaClasses } from '@mui/material';

const _GroupPreview = (props) => {
  const { group, board } = props;
  const groupIdx = boardService.getGroupIdxById(props.board, props.group._id);
  const storeTasks = props.board.groups[groupIdx].tasks;
  const [tasks, onUpdateTasks] = useState([storeTasks]);


  useEffect(() => {
    // await props.onLoadBoard()
    const groupIdx = boardService.getGroupIdxById(props.board, props.group._id);
    const tasks = props.board.groups[groupIdx].tasks;
    onUpdateTasks(tasks);
  }, [storeTasks]);

  return (
    <React.Fragment>
    <Droppable key={props.ind} droppableId={`${props.ind}`}>
      {(provided, snapshot) => (
        <div
        className='group-container flex column'
        ref={provided.innerRef}
        style={dragAndDropService.getListStyle(snapshot.isDraggingOver)}
        {...provided.droppableProps}>
          <div className='group-header flex'>
            <h4>{group.title}</h4>
          </div>
        {tasks && <TaskList
            groupIdx={props.groupIdx}
            tasks={tasks} />
            // groupId={props.group._id}
          }
        </div>)}
    </Droppable>
  <PreFeatureAdd
    onLoadBoard={props.onLoadBoard}
    board={board}
    group={group}
    type='task'
    />
    </React.Fragment>
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
