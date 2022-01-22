import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { GroupPreview } from './group-preview';
import { PreFeatureAdd } from './preFeatureAdd';
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
    const { destination, source, draggableId, type} = result;
    
    if (!destination) return;

    // if (type === 'list') {
      // const draggingGroup = board.groups.filter((group) => {
      //   return group._id === draggableId
      // })
      // board.groups.splice(source.index, 1)
      // board.groups.splice(destination.index, 0, draggingGroup[0])
      
      // const newGroupIds = board.groups;
      // const draggingGroup = newGroupIds.splice(source.index, 1);
      // newGroupIds.splice(destination.index, 0, draggingGroup[0])
      // board.groups = newGroupIds
      // boardService.saveBoard(board);
      // onSetBoard(board);
      // return 
    // }
    

  //   ******
    
  //   const sourceGroup = board.groups.filter((group) => {
  //     group._id === source.dropabbleId
  //   });
  //   const destinationGroup = destination ? board.groups.filter((group) => {
  //     group._id === destination.dropabbleId
  //   }) : {...sourceGroup};

  //   const [movingTask] = sourceGroup.tasks.filter((t) => {
  //     t._id === draggableId
  //   })

  //   const newSourceGroupTasks = sourceGroup.tasks.splice(source.index, 1);
  //   const newDestinationGroupTasks = destinationGroup.tasks.splice(
  //     destination.index,
  //     0,
  //     movingTask
  //   );

  //   const newTaskList = board.groups.map(group => {
  //     if (group._id === source.dropabbleId) {
  //       return {
  //         'group._id': group.groupId, // **** HERE
  //         tasks: newSourceGroupTasks
  //       };
  //     }
  //     if (column.groupName === destination.groupName) {
  //       return {
  //         groupName: column.groupName,
  //         tasks: newDestinationGroupTasks
  //       };
  //     }
  //     return column;
  //   });
  //   setTasks(newTaskList);
  // }

  // *******



    
    const sourceGroupIdx = boardService.getGroupIdxById(board, source.droppableId);
    const destinationGroupIdx = boardService.getGroupIdxById(board, destination.droppableId);
    const sourceGroup = board.groups[sourceGroupIdx];
    const destinationGroup = board.groups[destinationGroupIdx];
    const draggingTask = sourceGroup.tasks.filter((task) =>{ 
      return (task._id === draggableId)
    })[0];

    console.log('Board at drag end', board);

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
        <Droppable droppableId={board._id} type='list' direction='horizontal'>
          {(provided) => (
            <div 
            className='group-list-container flex' 
            ref={provided.innerRef} 
            {...provided.droppableProps}>
              {groups && groups.map((group, idx) => (
                <GroupPreview
                  onLoadBoard={props.onLoadBoard}
                  group={group}
                  key={idx}
                  index={idx}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <PreFeatureAdd
        onLoadBoard={props.onLoadBoard}
        board={board}
        type='group'
      />
    </section>
  );
};