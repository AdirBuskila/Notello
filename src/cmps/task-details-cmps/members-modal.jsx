import * as React from 'react';
import { useDispatch } from 'react-redux';
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

  const onAddMember = async (memberId) => {
    const taskMembers = board.groups[groupIdx].tasks[taskIdx].members;
    const alreadyInside = taskMembers.find((member) => {
      return member._id === memberId;
    });
    if (alreadyInside) return;
    const newMember = boardService.getMemberById(board, memberId);
    const activity = {
      _id: utilService.makeId(),
      txt: `${newMember.title} joined to task ${task.title}`,
      createdAt: Date.now(),
      byMember: 'Guest',
      task: {
        _id: task._id,
        title: task.title,
      },
    };
    try {
      board.activities.unshift(activity);
      taskMembers.push(newMember);
      board.groups[groupIdx].tasks[taskIdx].members = taskMembers;
      const action = { type: 'SET_BOARD', board };
      await dispatch(action);
    } catch (err) {
      console.log('Cannot add member to task', err);
    }
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
                    className='inner-member flex pointer'>
                    <Avatar
                      alt={utilService.getInitials(member.fullname)}
                      src={member.imgUrl}
                      style={{ width: '32px', height: '32px', border: '0' }}
                    />
                    <p>{member.fullname}</p>
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
