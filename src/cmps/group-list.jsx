import React, { useState, useEffect } from 'react';

import { GroupPreview } from './group-preview';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from './UI/Card';
import { TaskPreview } from './task-preview';

// groups, onLoadBoard

export const GroupList = (props) => {
  const groupsFromService = props.board.groups;
  // console.log("groupsFromService: ", groupsFromService);
  const [groups, setGroups] = useState(groupsFromService);
  console.log('props: ', props);

  useEffect(() => {
    // props.onLoadBoard();
    setGroups(groupsFromService);
  }, [groupsFromService]);

  if (!groups) return <q>No groups</q>;

  return (
    <div className='group-list-container flex'>
      {groups.map((group) => (
        <GroupPreview
          onLoadBoard={props.onLoadBoard}
          group={group}
          key={group._id}
        />
      ))}
    </div>
  );
};

// const onDragEnd = ({destination, source}) => {
// Todo - set tasks drop
// }

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       {Object.entries(groups).map(([id, group]) => {
//         return (
//           <Droppable droppableId={id}>
//             {(provided, snapshot) => {
//               return (
//                 <div === group-preview / group-list
//                  {...provided.droppableProps}
//                   ref={provided.innerRef}
//                 >
//                   {group.tasks.map((task, index) => {
//                     return (
//                       <Draggable key={task._id} draggableId={task._id} index={index}>
//                         {(provided, snapshot) => {
//                           return (
//                             <div === task-preview / task-list
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               >
//                               {task.title}
//                             </div>
//                           )
//                         }}
//                       </Draggable>
//                     )
//                   })}
//                 </div>
//               )
//             }}
//           </Droppable>
//         )
//       })}
//     </DragDropContext>
//   )
// }
