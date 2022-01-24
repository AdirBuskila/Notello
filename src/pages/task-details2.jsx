import * as React from 'react';
import { utilService } from '../services/util.service';
import { LabelsCmp } from '../cmps/labels-cmp';
import { MembersCmp } from '../cmps/members-cmp';
import { Textarea } from '../cmps/textarea-task-description';
import { Textarea1 } from '../cmps/textarea-task-comment';
import { CheckListModal } from '../cmps/check-list-modal';
import { CommentsSection } from '../cmps/comments-section';
import { LabelsModal } from '../cmps/details-labels';
import { ActivitySection } from '../cmps/details-activity';
import { AttachmentsCmp } from '../cmps/attachments-cmp';
import { useSelector, useDispatch } from 'react-redux';
import { boardService } from '../services/board.service';
import { connect } from 'react-redux';
import { loadTask, saveTask } from '../store/actions/board.action';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import NotesIcon from '@mui/icons-material/Notes';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { deepOrange } from '@mui/material/colors';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';


export const TaskDetails =  (props) => {

  const board = useSelector((state) => state.boardModule.board);
  React.useEffect(()=>{
    onLoadTask()
  },[])
  
  const [selctedTask, updateTask] = React.useState('')

  const onLoadTask = async () => {
    const { id } = props.match.params;
    try {
      const task = await boardService.getTask(board, id)
      updateTask(task)
    } catch (err) {
      console.log('Cant load current task');
      throw new Error(err);
    }
  }
  console.log('selctedTask', selctedTask);
    
    if (!selctedTask) return <div className=""></div>
    return (
    <div className='task-details'>
      <div className='window-header flex space-between'>
        <div className='task-title flex align-center'>
          <WebAssetIcon sx={{ marginTop: 0.5 }} />
          <p>{selctedTask.title}</p>
        </div>

        <div className='close-button flex align-center'>
          <CloseIcon />
        </div>
      </div>

      <div className='window-main-content'>
        <div className='buttons-container'>
          <p className='task-actions'>Suggested</p>
          <div className='button-container flex'>
            <PersonOutlineOutlinedIcon color='action' />
            <Typography>Join</Typography>
          </div>
          <p className='task-actions'>Add to card</p>
          <div className='button-container flex'>
            <PersonOutlineOutlinedIcon color='action' />
            <Typography>Members</Typography>
          </div>

          <div className='button-container flex'>
            <QueryBuilderIcon color='action' />
            <Typography>Dates</Typography>
          </div>
          <div className='button-container flex'>
            <AttachFileIcon color='action' />
            <Typography>Attachment</Typography>
          </div>
          <p className='task-actions'>Actions</p>
          <div className='button-container flex'>
            <ArrowForwardOutlinedIcon color='action' />
            <Typography>Move</Typography>
          </div>
          <div className='button-container flex'>
            <ContentCopyOutlinedIcon color='action' />
            <Typography>Copy</Typography>
          </div>
          <div className='button-container flex'>
            <Inventory2OutlinedIcon color='action' />
            <Typography>Archive</Typography>
          </div>
        </div>
        <div className='main-content'>
          <div className='task-info flex align-center'>
            <LabelsCmp labels={selctedTask.labels} />
            <MembersCmp members={selctedTask.members} />
          </div>
          <div className='description-container'>
            <div className='description flex'>
              <NotesIcon />
              <p>Description</p>
            </div>
            <div className='add-description-container'>
              <Textarea />
            </div>
          </div>
          <div className='attachments-container'>
            <AttachmentsCmp attachments={selctedTask.attachments} />
          </div>
          <div className='activity-container flex column'>
            <div className='activity flex'>
              <FormatListBulletedIcon />
              <p>Activity</p>
            </div>
            <div className='comment-container flex'>
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  width: 32,
                  height: 32,
                  marginInlineEnd: 1,
                }}
              >
                <p>NC</p>
              </Avatar>
              <Textarea1 />
            </div>
            <div className='comments-area flex column'>
              <CommentsSection comments={selctedTask.comments} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// function mapStateToProps({ boardModule }) {
//   return {
//     board: boardModule.board,
//   };
// }

// const mapDispatchToProps = {
//   // loadBoard,
//   // saveBoard,
// };

// export const TaskDetails = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(_TaskDetails);
