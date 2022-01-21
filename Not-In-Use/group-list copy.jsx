// import React, { useState, useEffect } from 'react';
// import ReactDOM from "react-dom";
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// import { dragAndDropService } from '../services/drag-and-drop';

// import { GroupPreview } from './group-preview';
// import { PreFeatureAdd } from './preFeatureAdd';

// export const GroupList = (props) => {
//   const groupsFromService = props.board.groups;
//   const [groups, setGroups] = useState(groupsFromService);
//   const [state, setState] = useState({})
//   console.log("state: ", state);

//   useEffect(() => {
//     setState(props.board)
//   }, [props.board])

//   useEffect(() => {
//     setGroups(groupsFromService);
//   }, [groupsFromService]);

//   const onDragEnd = (result) => {
//     const { source, destination } = result;

//     if (!destination) {
//       return;
//     }

//     const sInd = +source.droppableId;
//     const dInd = +destination.droppableId;

//     if (sInd === dInd) {
//       const items = dragAndDropService.reorder(state[sInd], source.index, destination.index);
//       const newState = [...state];
//       newState[sInd] = items;
//       setState(newState);
//     } else {
//       const result = dragAndDropService.move(state[sInd], state[dInd], source, destination);
//       const newState = [...state];
//       newState[sInd] = result[sInd];
//       newState[dInd] = result[dInd];

//       setState(newState.filter(group => group.length));
//     }
//   }

// //   return (
// //     // <Card 
// //     <div className='group-list-container flex'>
// //       {/* <DragDropContext onDragEnd={onDragEnd}> */}
// //       {groups && groups.map((group, index) => (
// //         <GroupPreview ind={index} onDragEnd={onDragEnd} // <Droppable key={ind} droppableId={`${ind}`}>
// //         groupIdx={index}
// //           onLoadBoard={props.onLoadBoard}
// //           group={group}
// //           key={group._id}
// //         />
// //         ))}
// //       </DragDropContext>
// //         <PreFeatureAdd onLoadBoard={props.onLoadBoard} board={props.board} type='group' />
// //     </div>
// //   );
// // };

// {/* </Card> */}
// // const onDragEnd = ({destination, source}) => {
// // Todo - set tasks drop
// // }

// //   return (
// //     <DragDropContext onDragEnd={onDragEnd}>
// //       {Object.entries(groups).map(([id, group]) => {
// //         return (
// //           <Droppable droppableId={id}>
// //             {(provided, snapshot) => {
// //               return (
// //                 <div === group-preview / group-list
// //                  {...provided.droppableProps}
// //                   ref={provided.innerRef}
// //                 >
// //                   {group.tasks.map((task, index) => {
// //                     return (
// //                       <Draggable key={task._id} draggableId={task._id} index={index}>
// //                         {(provided, snapshot) => {
// //                           return (
// //                             <div === task-preview / task-list
// //                               ref={provided.innerRef}
// //                               {...provided.draggableProps}
// //                               {...provided.dragHandleProps}
// //                               >
// //                               {task.title}
// //                             </div>
// //                           )
// //                         }}
// //                       </Draggable>
// //                     )
// //                   })}
// //                 </div>
// //               )
// //             }}
// //           </Droppable>
// //         )
// //       })}
// //     </DragDropContext>
// //   )
// // }
