import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { boardService } from '../../services/board.service';
import { utilService } from '../../services/util.service';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Avatar from '@mui/material/Avatar';

export const MembersModal = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let open = Boolean(anchorEl);
  const dispatch = useDispatch();
  
  const { board, group, task } = props;
  const [currTaskMembers, setCurrTaskMembers] =React.useState(task.members)
  console.log('currTaskMembers', currTaskMembers);
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    open = false;
    setAnchorEl(null);
  };

  const groupIdx = boardService.getGroupIdxById(board, group._id);
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => {
    return currTask._id === task._id;
  });

  const onAddMember = (memberId) => {
    let taskMembers = board.groups[groupIdx].tasks[taskIdx].members;
    const alreadyInside = taskMembers.find((member) => {
      return member._id === memberId;
    });

    if (alreadyInside) return;
    const newMember = boardService.getMemberById(board, memberId);
    const activity = boardService.addTaskActivity(`${newMember.fullname} joined to task ${task.title}`, task, loggedInUser);
    if (activity) board.activities.unshift(activity);
    if (alreadyInside)  {
      handleAlreadyInside(alreadyInside._id, taskMembers)
    } else if (!alreadyInside) {
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
      board.activities.unshift(activity);
      const newMember =  boardService.getMemberById(board,memberId)
      taskMembers.push(newMember);
      board.groups[groupIdx].tasks[taskIdx].members = taskMembers;
      const action = { type: 'SET_BOARD', board };
      dispatch(action);
    
  }
}
  

  const handleAlreadyInside = (memberId, taskMembers) => {
    taskMembers = taskMembers.filter((member)=> {
      return (member._id !== memberId)
    })
    setCurrTaskMembers(taskMembers)
    board.groups[groupIdx].tasks[taskIdx].members = taskMembers;
    const action = { type: 'SET_BOARD', board };
    dispatch(action);
  }
  const handleClassName = (member)=>{
    const isExsit = currTaskMembers.findIndex((currMember)=>{
      return (currMember._id === member._id)
    })
    if (isExsit === -1) return false
    else return true
  }
  return (
    <div className='button-container flex'>
      <PersonOutlineOutlinedIcon onClick={handleClick} color='action' />
      <Typography onClick={handleClick}>Members</Typography>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <div className='members-modal-container'>
          <div className='members-modal-header flex space-between'>
            <div className='close-button pointer' onClick={handleClose}>
              ✕
            </div>
          </div>
          <div className='members-inner flex column align-center'>
            <p>Members</p>
            <div className='members-container flex column'>
              <h4>Board members</h4>
              {board.members.map((member) => {
                return (
                  <div
                  key={member._id}
                  onClick={() => onAddMember(member._id)}
                  className={ handleClassName(member) ? 'inner-member flex pointer inside' : 'inner-member flex pointer'}
                  >
                    <Avatar
                      alt={utilService.getInitials(member.fullname)}
                      src={member.imgUrl}
                      style={{ width: '32px', height: '32px', border: '0' }}
                    />
                    <p>{member.fullname}</p>
                      { handleClassName(member) && <span>✓</span>}
                    {/* <p>({member.username})</p> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
}
