import { TaskPreview } from './task-preview';

export const TaskList = (props) => {
  console.log("props: ", props);
  const groupIdx = props.groupIdx

  return (
    <div 
    className='task-list-container flex column'>
      {props.tasks.map((task, index) => {
        return <TaskPreview groupIdx={groupIdx}  index={index} key={index} task={task} index={index}/>;
      })}
    </div>
  );
};