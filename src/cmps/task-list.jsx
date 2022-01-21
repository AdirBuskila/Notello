import { TaskPreview } from './task-preview';

export const TaskList = (props) => {
  const groupIdx = props.groupIdx

  return (
    <div 
    className='task-list-container flex column'>
      {props.tasks.map((task, index) => {
        console.log("task: ", task);
        return <TaskPreview groupIdx={groupIdx} taskIdx={index} key={index} task={task} index={index}/>;
      })}
    </div>
  );
};
