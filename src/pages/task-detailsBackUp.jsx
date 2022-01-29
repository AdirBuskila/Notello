import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as React from 'react';
import { utilService } from '../services/util.service';

import { MembersCmp } from '../cmps/task-details-cmps/members-cmp';
import { LabelsCmp } from '../cmps/task-details-cmps/labels-cmp';
import { Textarea } from '../cmps/task-details-cmps/textarea-task-description';
import { Textarea1 } from '../cmps/task-details-cmps/textarea-task-comment';
import { CheckListModal } from '../cmps/check-list-modal';
import { CommentsSection } from '../cmps/task-details-cmps/comments-section';
import { LabelsModal } from '../cmps/details-labels';
import { ActivitySection } from '../cmps/details-activity';
import { AttachmentsCmp } from '../cmps/task-details-cmps/attachments-cmp';
import { AttachmentModal } from '../cmps/task-details-cmps/attachment-modal';
import { DatePickerModal } from '../cmps/task-details-cmps/date-picker-modal';
import { CheckListCmps } from '../cmps/check-list-cmp';
import { Backdrop } from '../cmps/UI/backdrop';
///// CMPS
import { boardService } from '../services/board.service';
import { loadTask, saveTask } from '../store/actions/board.action';
///// ICONS
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { deepOrange } from '@mui/material/colors';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import SubjectIcon from '@mui/icons-material/Subject';

export const TaskDetails = (props) => {
  const currBoard = useSelector((state) => state.boardModule.board);
  const params = useParams();
  const boardId = params.boardId;
  const taskId = params.id;
  const [board, setBoard] = React.useState(currBoard);
  const [group, setGroup] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedTask, updateTask] = React.useState('');
  const [groupIdx, setGroupIdx] = React.useState('');
  const [taskIdx, setTaskIdx] = React.useState('');
  const [isCheckListAcctivated, setIsCheckListAcctivated] =
    React.useState(false);
  const [isAttachmentActivated, setIsAttachmentActivated] =
    React.useState(false);
  const [isAttachmentDeleted, setIsAttachmentDeleted] = React.useState(false);

  /* VALUES IN DETAILS : 

  board, group, task, groupIdx, taskIdx */

  React.useEffect(async () => {
    try {
      const newBoard = await boardService.getBoardById(boardId);
      const newGroup = boardService.getGroup(newBoard, taskId);
      setBoard(newBoard);
      setGroup(newGroup);
      await onLoadTask(newBoard, newGroup, taskId);
    } catch (err) {
      console.log('Cant load board');
    }
  }, []);

  const onLoadTask = async (board, group, taskId) => {
    try {
      const task = await boardService.getTask(board, taskId);
      const currGroupIdx = await boardService.getGroupIdxById(board, group._id);
      const currTaskIdx = await boardService.getTaskIdxById(
        board,
        group._id,
        taskId
      );
      updateTask(task);
      setGroupIdx(currGroupIdx);
      setTaskIdx(currTaskIdx);
    } catch (err) {
      console.log('Cant load current task');
      throw new Error(err);
    }
  };

  const onHandleClose = () => {
    const boardLoacation = '/b/' + boardId + '';
    props.history.push(boardLoacation);
  };

  if (!selectedTask || !board) return <div className=''></div>;
  return (
    <Backdrop onClick={onHandleClose}>
      <div
        className='task-details flex column '
        onClick={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
        }}>
        <div className='window-header align-center flex space-between'>
          <div className='task-title flex align-center'>
            <WebAssetIcon sx={{ marginTop: 0.5 }} />
            <p>{selectedTask.title}</p>
          </div>
          <div className='close-button flex align-center justify-center'>
            <CloseIcon onClick={onHandleClose} />
          </div>
        </div>

        <div className='task-main-container'>
          <div className='main-content'>
            <div className='task-info flex align-center'>
              <MembersCmp members={selectedTask.members} />
              <LabelsCmp labels={selectedTask.labels} />
            </div>
            <div className='description-container'>
              <div className='description flex'>
                <SubjectIcon />
                <p>Description</p>
              </div>
              <div className='add-description-container'>
                <Textarea />
              </div>
            </div>
            <CheckListCmps
              key={utilService.makeId()}
              isCheckListAcctivated={isCheckListAcctivated}
              task={selectedTask}
              groupIdx={groupIdx}
              board={board}
              taskIdx={taskIdx}
              group={group}
            />
            <div className='attachments-container'>
              <AttachmentsCmp
                task={selectedTask}
                board={board}
                group={group}
                attachments={selectedTask.attachments}
                setIsAttachmentDeleted={setIsAttachmentDeleted}
              />
            </div>
            <div className='activity-container flex column'>
              <div className='activity flex align-center space-between'>
                <div className='activity-header-container flex'>
                  <FormatListBulletedIcon />
                  <p>Activity</p>
                </div>
                <button>Show details</button>
              </div>
              <div className='comment-container flex'>
                <div className='user-container'>
                  <Avatar
                    sx={{
                      bgcolor: deepOrange[500],
                      width: 32,
                      height: 32,
                    }}>
                    <p>NC</p>
                  </Avatar>
                </div>
                <Textarea1 />
              </div>
              <div className='comments-area flex column'>
                <CommentsSection comments={selectedTask.comments} />
              </div>
            </div>
          </div>
          <div className='window-sidebar'>
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
            <CheckListModal
              isCheckListAcctivated={isCheckListAcctivated}
              board={board}
              groupIdx={groupIdx}
              taskIdx={taskIdx}
              task={selectedTask}
              setIsCheckListAcctivated={setIsCheckListAcctivated}
            />

            <div
              onClick={() => {
                setIsOpen(true);
              }}
              className='button-container flex'>
              <QueryBuilderIcon color='action' />
              <Typography>Dates</Typography>
              <DatePickerModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                task={selectedTask}
                board={board}
                group={group}
              />
            </div>
            <AttachmentModal
              task={selectedTask}
              board={board}
              group={group}
              attachments={selectedTask.attachments}
              setIsAttachmentDeleted={setIsAttachmentDeleted}
              isAttachmentDeleted={isAttachmentDeleted}
            />
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
        </div>
      </div>
    </Backdrop>
  );
};
