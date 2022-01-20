import { Droppable } from 'react-beautiful-dnd';
import {TaskPreview} from './task-preview'


export const TaskList = ({groupId, tasks}) => {

    return(
        // <Droppable droppableId={groupId}>
        // {(provided) => (
          <div className='task-list-container flex column'
        //     innerRef={provided.innerRef}
        //     {...provided.droppableProps}
        >
            {tasks.map((task, index) => {
              return <TaskPreview key={task._id} index={index} task={task} />;
            })}
            {/* {provided.placeholder} */}
          </div>
        // )}
    //   </Droppable>
    )
}


