import { Draggable } from 'react-beautiful-dnd';
import { dragAndDropService } from '../services/drag-and-drop';
import { TaskPreview } from './task-preview';

export const TaskList = (props) => {
  const groupIdx = props.groupIdx

  return (
    <div
      className='task-list-container flex column'>
      {props.tasks.map((task, index) => {
        <Draggable
          key={task._id}
          draggableId={task._id}
          index={index}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={dragAndDropService.getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around"
                }}
              >
                <TaskPreview groupIdx={groupIdx} taskIdx={index} key={task._id} task={task} />
              </div>
            </div>
          )}
        </Draggable>
      })}
    </div>
  );
};
