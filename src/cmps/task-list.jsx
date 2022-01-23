import { TaskPreview } from './task-preview';

export const TaskList = (props) => {
  const groupIdx = props.groupIdx;

  return (
    <div className='task-list-container flex column'>
      {props.tasks.map((task, index) => {
        return (
          <TaskPreview
          onLoadBoard={props.onLoadBoard}
            groupIdx={groupIdx}
            index={index}
            key={index}
            task={task}
          />
        );
      })}
    </div>
  );
};
