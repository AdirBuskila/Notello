import { Link } from 'react-router-dom';
import { Card } from '../cmps/UI/Card';

export const TaskPreview = ({ task }) => {
  console.log(task);
  return (
    <div>
      <Link key={task._id} to={`/c/${task._id}`}>
        <Card key={task._id} className='task flex column'>
          <p>{task.title}</p>
          {task.labels && (
            <ul className='flex'>
              {task.labels.map((label, idx) => {
                return (
                  <li key={idx} style={{ backgroundColor: `${label.bgc}` }}>
                    {label.name}
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </Link>
    </div>
  );
};
