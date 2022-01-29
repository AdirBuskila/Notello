import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { boardService } from '../../services/board.service';
import { utilService } from '../../services/util.service';
import { useDispatch, useSelector } from 'react-redux';



function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


export const DueDateCmp = (props) => {
    const dispatch = useDispatch();  
    const { dueDate, task, taskIdx, groupIdx, board} = props
    const loggedInUser = useSelector((state) => state.userModule.loggedInUser);

    const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    const date = dueDate[0].date
    const isDone = dueDate[0].isDone
    const newDate = Date.parse(date);
    const date1 = new Date(newDate)
    const year = date1.getFullYear()
    const month = date1.getMonth()
    const day = date1.getDate()
    const hours = date1.getHours()
    let minutes = date1.getMinutes()
    const timeAmPm = formatAMPM(date1)
    const Diff = newDate - Date.now()
    let isOverDue = (Diff < 0) ? true : false
    let isSoon = (Diff < 86400000) ? true : false
    if (isDone) {
      isSoon = false
      isOverDue = false
    }
    if (isOverDue) {
      isSoon = false
    }
    if (isSoon) {
      isOverDue = false
    }
    if (minutes === 0 ) {
        minutes = '00'
    }

    const handleChange = async (ev, isDone) => {
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
    };  
  



  return (
    <section className='due-date-main-container'>
      <div className='due-date-info-container'>
          <span>Due Date</span>
        <div className='span-container flex align-center'>
          <span className='due-date flex align-center' >
          <input checked={isDone} onChange={(ev) => {handleChange(ev, isDone)}} type="checkbox" />
          {months[month]} {day} at {timeAmPm}
          {isDone && <span className='complete' >complete</span>}
          {isOverDue && <span className='over-due' >over due</span> }
          {isSoon && <span className='soon' >due soon</span> }
          </span>
        </div>
      </div>
      <div className='members-avatar-container flex'>

      </div>
    </section>
  );
};
