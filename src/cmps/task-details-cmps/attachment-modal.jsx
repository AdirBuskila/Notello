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


  const handleSubmit =  (eve) => {
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

  const handleUploadImage = async (obj) => {
    try {

      
      const title = (!attachmentName) ? 'attachment' : attachmentName
      const attachment = {
        _id: utilService.makeId(),
        txt: title,
        url: obj.url,
        createdAt: Date.now()
      }
      board.groups[groupIdx].tasks[taskIdx].attachments.push(attachment)
      console.log('added attachment');
      const action = {type: 'SET_BOARD', board}
      const dispatched = await dispatch(action)
      console.log('dispatch');
      handleClose()
    } catch (err) {
      console.log('cannot upload image', err);
    }

  }

  const uploadImg = async (ev) => {
    const CLOUD_NAME = 'dubjerksn'
    const UPLOAD_URL =  `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const formData = new FormData()
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', 'h5vezwzo')
    try {
      const res = await fetch(UPLOAD_URL, {
          method: 'POST',
          body: formData
      })
      const obj = await res.json()
      handleUploadImage(obj)
    } catch (err) {
      console.log('cannot upload img',err);
    }
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
            <div className="upload-image">
        <form>
        <input onChange={(ev)=>{uploadImg(ev)}} type='file'/>
        </form>
      </div>
            </div>
          </div>
      </Popover>
    </div>
  );
};
