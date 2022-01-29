import React, { useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import Typography from '@mui/material/Typography';
import { boardService } from '../../services/board.service';
import { useDispatch } from 'react-redux';

export function DatePickerModal(props) {
  const { task, group, board } = props;
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();
  const ExampleCustomInput = React.forwardRef(({ onClick }, ref) => (
    <div onClick={onClick} ref={ref} className='button-container flex'>
      <QueryBuilderIcon color='action' />
      <Typography>Dates</Typography>
    </div>
  ));

  const groupIdx = boardService.getGroupIdxById(board, group._id);
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => {
    return currTask._id === task._id;
  });

  const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate);
    console.log('selectedDate', selectedDate);
    const newDueDate = { date: selectedDate, isDone: false };
    const newArray = [];
    newArray.push(newDueDate);
    board.groups[groupIdx].tasks[taskIdx].dueDate = newArray;
    const action = { type: 'SET_BOARD', board };
    dispatch(action);
  };
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      startDate={selectedDate}
      customInput={<ExampleCustomInput />}
      formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
    />
  );
}
