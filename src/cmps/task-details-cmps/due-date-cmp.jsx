import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import { deepOrange, deepPurple } from '@mui/material/colors';

import { utilService } from '../../services/util.service';


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
  


export const DueDateCmp = ({ dueDate }) => {
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
    console.log(timeAmPm);

    if (minutes === 0 ) {
        minutes = '00'
    }
    console.log(minutes);
  return (
    <section className='due-date-main-container'>
      <div className='due-date-info-container'>
          <span>Due Date</span>
        <div className='span-container flex'>
          <span className='due-date flex align-center' >{months[month]} {day} at {timeAmPm}{isDone && <span className='complete' >complete</span>}</span>
          
        </div>
      </div>
      <div className='members-avatar-container flex'>

      </div>
    </section>
  );
};
