import * as React from 'react';
import { useDispatch } from 'react-redux';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { boardService } from '../../services/board.service';
import { utilService } from '../../services/util.service';

export const AttachmentModal = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let open = Boolean(anchorEl);
  const [attachmentName, setAttachmentName] = React.useState('');
  const [attachmentUrl, setAttachmentUrl] = React.useState('');
  const dispatch = useDispatch()

  

  const {board, group, task} = props

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    console.log('im here');
    open = false
    console.log('open', open);;

    setAnchorEl(null);
  };

  const groupIdx = boardService.getGroupIdxById(board, group._id)
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask)=>{
    return (currTask._id === task._id)
  })


  const handleSubmit = (eve) => {
    if (!attachmentUrl) return
    eve.preventDefault()
    const title = (!attachmentName) ? 'attachment' : attachmentName
    const attachment = {
      _id: utilService.makeId(),
      txt: title,
      url: attachmentUrl,
      createdAt: Date.now()
  }
    board.groups[groupIdx].tasks[taskIdx].attachments.push(attachment)
    const action = {type: 'SET_BOARD', board}
    dispatch(action)
    handleClose()
  }
  
  return (
    <div className='button-container flex' >
      <AttachFileIcon onClick={handleClick} color='action' />
      <Typography onClick={handleClick} >Attachment</Typography>
      <Popover
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
            <div className='close-button pointer' onClick={handleClose}>
              ✕
            </div>
          </div>
          <div className='attachment-inner flex column'>
            <form onSubmit={handleSubmit}>
              <p>Attach a link</p>
            <input
            autoFocus
            onChange={({target})=> {
              setAttachmentUrl(target.value)
            }}
            value={attachmentUrl}
            placeholder='Paste any link here...'
            ></input>
            {attachmentUrl.length > 0 && <div className="link-name">
              <p>Link name (optional)</p>
            <input
            onChange={({target})=> {
              setAttachmentName(target.value)
            }}
            value={attachmentName}
            ></input>
            </div> }
            <button>Attach</button>
            </form>
            </div>
          </div>
      </Popover>
    </div>
  );
};
