import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { boardService } from '../../services/board.service';
import { utilService } from '../../services/util.service';

export const AttachmentModal = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [attachmentTitle, setAttachmentTitle] = React.useState('attachment');
  const [attachmentUrl, setAttachmentUrl] = React.useState('');

  const {board, group,task} = props

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const groupIdx = boardService.getGroupIdxById(board, group._id)
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask)=>{
    return (currTask._id === task._id)
  })


  const handleSubmit = (eve) => {
    eve.preventDefault()
    const attachment = {
      _id: utilService.makeId(),
      txt: 'title',
      url: attachmentUrl,
      createdAt: Date.now()
  }
    console.log('attachment', attachment);
    // board.groups[groupIdx].tasks[taskIdx].attachments.push(attachment)
    // console.log(event);
  }



  const open = Boolean(anchorEl);
  const id = open ? 'attachment-modal' : undefined;

  return (
    <div className='button-container flex' onClick={handleClick}>
      <AttachFileIcon color='action' />
      <Typography>Attachment</Typography>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className='attachment-modal-container'>
          <div className='attachment-modal-header flex space-between'>
            <p> Add Attachment</p>
            <div className='close-button' onClick={handleClick}>
              ✕
            </div>
          </div>
          <div className='attachment-inner flex column'>
            <form onSubmit={handleSubmit}>
            <input
            autoFocus
            placeholder='Paste any link here...'
            ></input>
            <button>Attach</button>
            </form>
            </div>
          </div>
      </Popover>
    </div>
  );
};
