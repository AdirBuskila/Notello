import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';

import { boardService } from '../../services/board.service';
import { utilService } from '../../services/util.service';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


export const JoinCmp = (props) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);


  const { board, group, task } = props;

  

  const groupIdx = boardService.getGroupIdxById(board, group._id);
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => {
    return currTask._id === task._id;
  });

  const onJoin = async (memberId) => {
    const taskMembers = board.groups[groupIdx].tasks[taskIdx].members;
    console.log('taskMembers', taskMembers);
    const alreadyInside = taskMembers.find((member) => {
      return member._id === memberId;
    });
    if (alreadyInside) return;
<<<<<<< HEAD
    const newMember = boardService.getMemberById(board, memberId);
    const activity = boardService.addTaskActivity(`${newMember.fullname} joined to task ${task.title}`, task, loggedInUser);
    try {
      if (activity) board.activities.unshift(activity);
      taskMembers.push(newMember);
=======
    console.log('alreadyInside', alreadyInside);
    const activity = {
      _id: utilService.makeId(),
      txt: `${loggedInUser.fullname} joined to task ${task.title}`,
      createdAt: Date.now(),
      byMember: loggedInUser,
      task: {
        _id: task._id,
        title: task.title,
      },
    };
    try {
      board.activities.unshift(activity);
      taskMembers.push(loggedInUser);
>>>>>>> 853babb95d92a3020613531166dc2f9b3060f9db
      board.groups[groupIdx].tasks[taskIdx].members = taskMembers;
      const action = { type: 'SET_BOARD', board };
      await dispatch(action);
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
