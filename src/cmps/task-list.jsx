import { TaskPreview } from './task-preview';

export const TaskList = ({ tasks }) => {
  console.log(tasks);
  return (
    <div className='task-list-container flex column'>
      {tasks.map((task) => {
        return <TaskPreview key={task._id} task={task} />;
      })}
    </div>
  );
};
