import AccessTimeIcon from '@mui/icons-material/AccessTime';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { boardService } from '../../services/board.service';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const DueDateBadge = (props) => {
  const {
    task,
    dueDate,
    board,
    groupIdx,
    setIsDueDateChanged,
    isDueDateChanged,
  } = props;
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => {
    return currTask._id === task._id;
  });
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);

  const dispatch = useDispatch();

  const handleClick = async (ev, isDone) => {
    ev.stopPropagation();
    ev.preventDefault();
    const activity = boardService.addTaskActivity(`added due date for task ${task.title} set to (${dueDate[0].date})`, task._id, task.title, loggedInUser)
    try {
      if (activity) board.activities.unshift(activity);
      task.dueDate[0].isDone = !isDone;
      board.groups[groupIdx].tasks[taskIdx] = task;
      await boardService.save(board);
      const action = { type: 'SET_BOARD', board };
      await dispatch(action);
    } catch (err) {
      console.log('Cannot add due date to task');
    }
    setIsDueDateChanged(!isDueDateChanged);
  };

  
  const date = dueDate[0].date;
  const isDone = dueDate[0].isDone;
  const newDate = Date.parse(date);
  const Diff = newDate - Date.now();
  const isOverDue = Diff < 0 ? 'over-due' : '';
  const isSoon = Diff < 86400000 ? 'soon' : '';
  const date1 = new Date(newDate);
  const month = date1.getMonth();
  const day = date1.getDate();
  let clockColor = isDone ? 'white' : 'action';
  const dueDateClass = isDone
  ? 'due-date-badge pointer flex align-center done'
  : `due-date-badge pointer flex align-center ${isSoon} ${isOverDue}`;
  if (isOverDue || isSoon) {
    clockColor = 'white';
  }
  
  const changeImg = () => {
    console.log('im here');
    
  }
    return (
      <div 
      onMouseEnter={changeImg}
      onClick={(ev) => {
        handleClick(ev, isDone);
      }}
      className={dueDateClass}>
      <AccessTimeIcon id='due-date' fontSize='small' color={clockColor} />
      <span> {months[month]}</span>
      <span> {day}</span>
    </div>
  );
};
