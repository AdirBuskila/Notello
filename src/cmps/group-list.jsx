import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { GroupPreview } from './group-preview';
import { PreFeatureAdd } from './preFeatureAdd';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { boardService } from '../services/board.service';

export const GroupList = (props) => {
  const dispatch = useDispatch();
  const board = useSelector(
    (state) => state.boardModule.board
  );
  const groupsFromService = board.groups;
  const [groups, setGroups] = useState(groupsFromService);

  useEffect(() => {
    setGroups(groupsFromService);
  }, [groupsFromService]);

  const onSetBoard = (board) => {
    const action = { type: 'SET_BOARD', board };
    dispatch(action);
  }

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log("source: ", source);
    console.log("destination: ", destination);

    if (!destination) return;

    const sourceGroupIdx = boardService.getGroupIdxById(board, source.droppableId);
    const destinationGroupIdx = boardService.getGroupIdxById(board, destination.droppableId);
    const sourceGroup = board.groups[sourceGroupIdx];
    const destinationGroup = board.groups[destinationGroupIdx];
    const draggingTask = sourceGroup.tasks.filter((task) => task._id === draggableId)[0];

    if (source.dropabbleId === destination.dropabbleId) {
      sourceGroup.tasks.splice(source.index, 1);
      destinationGroup.tasks.splice(destination.index, 0, draggingTask);
      boardService.saveBoard(board);
      onSetBoard(board);
    } else {
      sourceGroup.tasks.splice(source.index, 1);
      destinationGroup.tasks.splice(destination.index, 0, draggingTask);
      boardService.saveBoard(board);
      onSetBoard(board);
    }
  }

  if (!groups) return <q>No groups</q>;
  return (
    <section className='group-list-container flex'>
      <DragDropContext onDragEnd={onDragEnd}>
              {groups && groups.map((group, idx) => (
                  <GroupPreview
                    onLoadBoard={props.onLoadBoard}
                    group={group}
                    key={idx}
                  />
                ))}
      </DragDropContext>
      <PreFeatureAdd
        onLoadBoard={props.onLoadBoard}
        board={board}
        type='group'
        />
    </section>
  );
};