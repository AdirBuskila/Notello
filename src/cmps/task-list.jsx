import { TaskPreview } from './task-preview';

export const TaskList = (props) => {
  return (
    <div 
    className='task-list-container flex column'>
      {props.tasks.map((task, index) => {
        return <TaskPreview groupIdx={props.groupIdx} taskIdx={index} key={task._id} task={task} />;
      })}
    </div>
  );
};
