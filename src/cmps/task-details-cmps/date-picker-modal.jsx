import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { Button, makeStyles } from '@material-ui/core';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { boardService } from '../../services/board.service';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export function DatePickerModal(props) {
  const classes = useStyles();
  const { task, group, board} = props;
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();

  const groupIdx = boardService.getGroupIdxById(board, group._id);
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => {
    return currTask._id === task._id;
  });

  const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate);
    const newDueDate = { date: selectedDate, isDone: false };
    const newArray = [];
    newArray.push(newDueDate);
    board.groups[groupIdx].tasks[taskIdx].dueDate = newArray;
    const action = { type: 'SET_BOARD', board };
    dispatch(action);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        style={{
          opacity: '0',
          width: '100%',
          position: 'relative',
          right: '50px',
        }}
        id='date-picker'
        margin='normal'
        variant='inline'
        label=''
        format='dd MMM yyyy'
        value={selectedDate}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
}
