import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Loader } from './loader';

import { boardService } from '../services/board.service';

import { GroupPreview } from './group-preview';
import { BoardActivity } from '../pages/board-activity';
import { PreFeatureAdd } from './preFeatureAdd';

export const GroupList = (props) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
  const board = useSelector((state) => state.boardModule.board);

  const onSetBoard = async (board) => {
    const activity = boardService.addGeneralActivity(`entered to ${board.title} board`, loggedInUser) 
    try {
      if (activity) board.activities.unshift(activity);
      const action = { type: 'SET_BOARD', board };
      dispatch(action);
    } catch (err) {
      console.log(`Cannot set board ${board._id}`);
    }
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (type === 'list') {
      const draggingGroup = board.groups.filter((group) => {
        return group._id === draggableId;
      })[0];
      board.groups.splice(source.index, 1);
      board.groups.splice(destination.index, 0, draggingGroup);
      boardService.save(board);
      onSetBoard(board);
      return;
    }

    const sourceGroupIdx = boardService.getGroupIdxById(
      board,
      source.droppableId
    );
    const destinationGroupIdx = boardService.getGroupIdxById(
      board,
      destination.droppableId
    );
    const sourceGroup = board.groups[sourceGroupIdx];
    const destinationGroup = board.groups[destinationGroupIdx];
    const draggingTask = sourceGroup.tasks.filter((task) => {
      return task._id === draggableId;
    })[0];

    if (source.dropabbleId === destination.droppableId) {
      sourceGroup.tasks.splice(source.index, 1);
      destinationGroup.tasks.splice(destination.index, 0, draggingTask);
      boardService.save(board);
      onSetBoard(board);
    } else {
      sourceGroup.tasks.splice(source.index, 1);
      destinationGroup.tasks.splice(destination.index, 0, draggingTask);
      boardService.save(board);
      onSetBoard(board);
    }
  };

  if (!board.groups) return <Loader />;
  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={board._id} type='list' direction='horizontal'>
          {(provided) => (
            <div
              className='group-list-container flex'
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {board.groups &&
                board.groups.map((group, idx) => (
                  <GroupPreview
                  setPreview={props.setPreview}
                    onLoadBoard={props.onLoadBoard}
                    group={group}
                    key={idx}
                    index={idx}
                  />
                ))}
              {provided.placeholder}
              <PreFeatureAdd
                onLoadBoard={props.onLoadBoard}
                board={board}
                type='group'
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </React.Fragment>
  );
};
