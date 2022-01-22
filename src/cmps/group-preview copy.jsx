import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { PreFeatureAdd } from './preFeatureAdd';
import { TaskList } from './task-list';
import { loadBoard } from '../store/actions/board.action';
import { boardService } from '../services/board.service';

// import { Card } from './UI/Card';
// import { cardActionAreaClasses } from '@mui/material';

const _GroupPreview = (props) => {
  const { group, board } = props;
  const groupIdx = boardService.getGroupIdxById(props.board, props.group._id);
  const storeTasks = props.board.groups[groupIdx].tasks;
  const [tasks, onUpdateTasks] = useState([storeTasks]);
  const [isTitleClicked, setTitleClick] = useState(false);


  useEffect(() => {
    // await props.onLoadBoard()
    const groupIdx = boardService.getGroupIdxById(props.board, props.group._id);
    const tasks = props.board.groups[groupIdx].tasks;
    onUpdateTasks(tasks);
  }, [storeTasks]);

  return (
    <div 
    draggable="true"
    className='group-container flex column'>
      <div className='group-header flex'>
        {!isTitleClicked && <h4 onClick={() => setTitleClick(!isTitleClicked)}>{props.group.title}</h4>}
         {isTitleClicked && <input defaultChecked={group.title}></input>}
      </div>
      {tasks && <TaskList
      groupIdx={props.groupIdx}
        groupId={props.group._id}
        tasks={tasks} />}
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

