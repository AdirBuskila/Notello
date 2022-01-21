import { TaskPreview } from './task-preview';

export const TaskList = (props) => {
  const groupIdx = props.groupIdx

  return (
    <div 
    className='task-list-container flex column'>
      {props.tasks.map((task, index) => {
        return <TaskPreview groupIdx={groupIdx} taskIdx={index} key={task._id} task={task} />;
      })}
    </div>
  );
};
