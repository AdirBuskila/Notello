import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';

import { saveBoard } from '../../store/actions/board.action';

import { boardService } from '../../services/board.service';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


export const JoinCmp = (props) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
  const { board, group, task } = props;
  const groupIdx = boardService.getGroupIdxById(board, group._id);
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => {
    return currTask._id === task._id;
  });

  const onJoin = (memberId) => {
    const taskMembers = board.groups[groupIdx].tasks[taskIdx].members;
    const alreadyInside = taskMembers.find((member) => {
      return member._id === memberId;
    });
    if (alreadyInside) return;
    const activity = boardService.addTaskActivity(`${loggedInUser.fullname} joined to task ${task.title}`, task._id, task.title, loggedInUser);
    try {
      if (activity) board.activities.unshift(activity);
      taskMembers.push(loggedInUser);
      board.groups[groupIdx].tasks[taskIdx].members = taskMembers;
      dispatch(saveBoard(board))
    } catch (err) {
      console.log('Cannot add member to task', err);
    }
  };

  return (
    <div className='button-container flex'>
      <PersonOutlineOutlinedIcon onClick={()=> onJoin(loggedInUser._id)} color='action' />
      <Typography onClick={()=> onJoin(loggedInUser._id)}>Join</Typography>
    </div>
  );
};
