import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { GroupPreview } from './group-preview';
import { PreFeatureAdd } from './preFeatureAdd';
import { boardService } from '../services/board.service';

export const GroupList = (props) => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.boardModule.board);
  const groupsFromService = board.groups;
  const [groups, setGroups] = useState(groupsFromService);

  useEffect(() => {
    setGroups(groupsFromService);
  }, [groupsFromService]);

  const onSetBoard = (board) => {
    const action = { type: 'SET_BOARD', board };
    dispatch(action);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type} = result;
    
    if (!destination) return;

    if (type === 'list') {
      const draggingGroup = board.groups.filter((group) => {
        return group._id === draggableId
      })[0]
      board.groups.splice(source.index, 1)
      board.groups.splice(destination.index, 0, draggingGroup)
      boardService.saveBoard(board);
      onSetBoard(board);
      return 
    }

    const sourceGroupIdx = boardService.getGroupIdxById(board, source.droppableId);
    const destinationGroupIdx = boardService.getGroupIdxById(board, destination.droppableId);
    const sourceGroup = board.groups[sourceGroupIdx];
    const destinationGroup = board.groups[destinationGroupIdx];
    const draggingTask = sourceGroup.tasks.filter((task) => {
      return task._id === draggableId;
    })[0];

    console.log('Board at drag end', board);

    if (source.dropabbleId === destination.droppableId) {
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
  };

  if (!groups) return <q>No groups</q>;
  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={board._id} type='list' direction='horizontal'>
          {(provided) => (
            <div
              className='group-list-container flex'
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {groups &&
                groups.map((group, idx) => (
                  <GroupPreview
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
