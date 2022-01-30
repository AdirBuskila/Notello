import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { boardService } from '../../services/board.service';
import { utilService } from '../../services/util.service';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Avatar from '@mui/material/Avatar';

export const MembersModal = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let open = Boolean(anchorEl);
  const dispatch = useDispatch();
  
  const { board, group, task } = props;
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
    let newMember = board.members.find((currMember) => {
      return (currMember._id === memberId)
  })
    const alreadyInside = taskMembers.find((member) => {
      return member._id === memberId;
    });


    if (alreadyInside) {
      const activity = boardService.addTaskActivity(
        `${newMember.fullname} left task ${task.title}`,
        task,
        loggedInUser
        );
    if (activity) board.activities.unshift(activity);
      handleAlreadyInside(alreadyInside._id, taskMembers);

    } else {
      const activity = boardService.addTaskActivity(`${loggedInUser.fullname} joined to task ${task.title}`,task._id, task.title,loggedInUser)
      if (activity) board.activities.unshift(activity);
      taskMembers.push(newMember);
      board.groups[groupIdx].tasks[taskIdx].members = taskMembers;
      const action = { type: 'SET_BOARD', board };
      dispatch(action);
    }
  };

  const handleAlreadyInside = (memberId, taskMembers) => {
    taskMembers = taskMembers.filter((member) => {
      return member._id !== memberId;
    });
    board.groups[groupIdx].tasks[taskIdx].members = taskMembers;
    const action = { type: 'SET_BOARD', board };
    dispatch(action);
  };
  const handleClassName = (member) => {
    const isExist = task.members.findIndex((currMember) => {
      return currMember._id === member._id;
    });
    if (isExist === -1) return false;
    else return true;
  };
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
                    className={
                      handleClassName(member)
                        ? 'inner-member flex pointer inside'
                        : 'inner-member flex pointer'
                    }>
                    <Avatar
                      alt={utilService.getInitials(member.fullname)}
                      src={member.imgUrl}
                      style={{ width: '32px', height: '32px', border: '0' }}
                    />
                    <p>{member.fullname}</p>
                    {handleClassName(member) && <span>✓</span>}
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
};
