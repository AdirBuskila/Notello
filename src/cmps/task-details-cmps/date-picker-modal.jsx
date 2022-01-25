import React, { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider  } from "@material-ui/pickers";
import { Button, makeStyles } from "@material-ui/core";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { boardService } from "../../services/board.service";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
  },
});

export function DatePickerModal(props) {
  const classes = useStyles();
  const {isOpen, setIsOpen, task, group, board} = props
  const [selectedDate, handleDateChange] = useState("2022-01-25T00:00:00.000Z");
  console.log('selectedDate', selectedDate);

  const groupIdx = boardService.getGroupIdxById(board, group._id)
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask)=>{
    return (currTask._id === task._id)
  })

  const HandleClose = ()=> {
    AddDate()
    setIsOpen(false)
  }

  const AddDate = () => {
    board.groups[groupIdx].tasks[taskIdx].dueDate.push(selectedDate)
    boardService.saveBoard(board)
  }

  return (

    <div className={classes.container}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        style={{zIndex:'-1'}}
        variant="inline"
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        label="Open me from button"
        format="d MMM yyyy"
        value={selectedDate}
        onAccept={()=> setIsOpen(false)}
        onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
}

