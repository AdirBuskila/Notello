import * as React from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { utilService } from '../../services/util.service';
import { boardService } from '../../services/board.service';
import { useDispatch } from 'react-redux';




export const AttachmentsCmp = (props) => {

    const {attachments, task, group, board} = props

    const groupIdx = boardService.getGroupIdxById(board, group._id)
    const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask)=>{
      return (currTask._id === task._id)
    })

  const dispatch = useDispatch()

    const DeleteAttachment = (attachmentId) => {
        console.log('attachmentId', attachmentId);
        console.log(board.groups[groupIdx].tasks[taskIdx].attachments)
        const attachmentIdx = task.attachments.findIndex((attachment)=>{
            return (attachmentId === attachment._id)
        })
        task.attachments.splice(attachmentIdx,1)
        board.groups[groupIdx].tasks[taskIdx] = task
        const action = {type: 'SET_BOARD', board}
        dispatch(action)
        console.log('after');
        console.log(task.attachments);

    }
  

    if (attachments.length === 0) return <p></p>;
    return (
        <section className='attachments-main-container'>
            <div className="attachments-header flex">
              <AttachFileIcon />
              <p>Attachments</p>
            </div>
            <div className="attachments-thumbnail-container flex">
            {attachments.map((attachment, index) => {
                return (
                    <div key={index} className="attachment-thumbnail flex">
                        <a>
                        <div className="attachment-image" style={{backgroundImage: `url(${attachment.url})`}} ></div>
                        </a>
                        <div className="attachment-info">
                        <p className='attachment-txt' >{attachment.txt}</p>
                        <p className='attachment-date'>{utilService.fixTimestamp(attachment.createdAt)}</p>
                        <p className='pointer' onClick={()=> {DeleteAttachment(attachment._id)}} >Delete</p>
                        </div>
                    </div>
                )
            })}
            </div>
        </section>
    )
}
