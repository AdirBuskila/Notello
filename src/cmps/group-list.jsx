import React, { useState, useEffect } from 'react';

import { GroupPreview } from './group-preview';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from './UI/Card';

// groups, onLoadBoard

export const GroupList = (props) => {
  // const groupsFromService = props.board.groups;
  // console.log("groupsFromService: ", groupsFromService);
  const [groups, setGroups] = useState(props.board.groups);
  console.log("groups: ", groups);

  useEffect(() => {
    // props.onLoadBoard();
    setGroups(props.board.groups)
  }, [])

  if (!groups) return <q>No groups</q>;


  const onDragEnd = () => {
    // Todo - set tasks drop
  }

  return (
    <Card className='group-list-container flex'>
      {groups.map((group) => (
        <GroupPreview
          onLoadBoard={props.onLoadBoard}
          group={group}
          key={group._id}
        />
      ))}
    </Card>
  );
}

/* return (
  <DragDropContext onDragEnd={onDragEnd}>
    {Object.entries(groups).map(([id, group]) => {
      return (
        <Droppable droppableId={id}>
          {(provided, snapshot) => {
            return (
              <div{...provided.droppableProps}
                ref={provided.innerRef}
              >
                {group.tasks.map((task, index) => {
                  return (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: 'none',
                              padding: 16,
                              margin: '0 0 8px 0',
                              minHeigh: '50px',
                              backgroundColor: snapshot.isDragging ? 'red' : 'blue',
                              color: 'white',
                              ...provided.draggableProps.style
                            }}>
                            {task.title}
                          </div>
                        )
                      }}
                    </Draggable>
                  )
                })}
              </div>
            )
          }}
        </Droppable>
      )
    })}
  </DragDropContext>
)
 } */