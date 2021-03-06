import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Loader } from '../UI/loader';

import { saveBoard } from '../../store/actions/board.action';

import { boardService } from '../../services/board.service';

import { GroupPreview } from './group-preview';
import { PreFeatureAdd } from './preFeatureAdd';

export const GroupList = (props) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
  const board = useSelector((state) => state.boardModule.board);

  const onSetBoard = (board) => {
    const activity = boardService.addGeneralActivity(
      `entered to ${board.title} board`,
      loggedInUser
    );
    try {
      if (activity) board.activities.unshift(activity);
      dispatch(saveBoard(board))
    } catch (err) {
      console.log(`Cannot set board ${board._id}`);
    }
  };

  // const onDragStart = (result) => {
    // const { destination, source, draggableId, type } = result;
    // if (type === 'list') return;
    // const element = document.getElementById(draggableId);
    // element.classList.add('on-move');
  // }


  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (type === 'list') {
      const draggingGroup = board.groups.filter((group) => {
        return group._id === draggableId;
      })[0];
      board.groups.splice(source.index, 1);
      board.groups.splice(destination.index, 0, draggingGroup);
      dispatch(props.saveBoard(board));
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
    
    // const element = document.getElementById(draggableId);
    // element.classList.remove('on-move')

    if (source.dropabbleId === destination.droppableId) {
      sourceGroup.tasks.splice(source.index, 1);
      destinationGroup.tasks.splice(destination.index, 0, draggingTask);
      dispatch(props.saveBoard(board));
      onSetBoard(board);
    } else {
      sourceGroup.tasks.splice(source.index, 1);
      destinationGroup.tasks.splice(destination.index, 0, draggingTask);
      dispatch(props.saveBoard(board));
      onSetBoard(board);
    }
  };

  if (!board.groups) return <Loader />;
  return (
    <React.Fragment>
      <DragDropContext
      // onDragStart={onDragStart} 
      onDragEnd={onDragEnd}>
        <Droppable droppableId={board._id} type='list' direction='horizontal'>
          {(provided) => (
            <div
              className='group-list-container flex'
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {board.groups &&
                board.groups.map((group, idx) => (
                  <GroupPreview
                    setPos={props.setPos}
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
