import React, { useState, useEffect } from 'react';

import { GroupPreview } from './group-preview';
import { PreFeatureAdd } from './preFeatureAdd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const GroupList = (props) => {
  const groupsFromService = props.board.groups;
  const [groups, setGroups] = useState(groupsFromService);

  useEffect(() => {
    setGroups(groupsFromService);
  }, [groupsFromService]);

  if (!groups) return <q>No groups</q>;
  return (
    <section className='group-list-container flex'>
      {groups &&
        groups.map((group, idx) => (
          <GroupPreview
            onLoadBoard={props.onLoadBoard}
            group={group}
            key={idx}
          />
        ))}
      <PreFeatureAdd
        onLoadBoard={props.onLoadBoard}
        board={props.board}
        type='group'
      />
    </section>
  );
};

{/* </Card> */}
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
