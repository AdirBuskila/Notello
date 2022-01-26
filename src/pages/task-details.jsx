import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as React from 'react';
import { utilService } from '../services/util.service';

import { MembersCmp } from '../cmps/task-details-cmps/members-cmp';
import { LabelsCmp } from '../cmps/task-details-cmps/labels-cmp';
import { Textarea } from '../cmps/task-details-cmps/textarea-task-description';
import { AddCommentCmp } from '../cmps/task-details-cmps/textarea-task-comment';
import { CheckListModal } from '../cmps/check-list-modal';
import { CommentsSection } from '../cmps/task-details-cmps/comments-section';
import { LabelsModal } from '../cmps/details-labels';
import { ActivitySection } from '../cmps/details-activity';
import { AttachmentsCmp } from '../cmps/task-details-cmps/attachments-cmp';
import { AttachmentModal } from '../cmps/task-details-cmps/attachment-modal';
import { DatePickerModal } from '../cmps/task-details-cmps/date-picker-modal';
import { CheckListCmp } from '../cmps/check-list-cmp';
import { CoverModal } from '../cmps/cover-modal';
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
import { DueDateCmp } from '../cmps/task-details-cmps/due-date-cmp';

export const TaskDetails = (props) => {
  const {useState} = React
  const currBoard = useSelector((state) => state.boardModule.board);
  const params = useParams();
  const boardId = params.boardId;
  const taskId = params.id;
  const [board, setBoard] = useState(currBoard);
  const [group, setGroup] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, updateTask] = useState('');
  const [groupIdx, setGroupIdx] = useState('');
  const [taskIdx, setTaskIdx] = React.useState('');
  const [isCheckListAcctivated, setIsCheckListAcctivated] = React.useState(false);
  const [isColorPicked, setIsColorPicked] = React.useState('');
  const dispatch = useDispatch();

  const whichBgcExist = (selectedTask.cover) ? selectedTask.cover.background : null;

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
  }, [currBoard]);

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

  const [taskTitle, setTaskTitle] = React.useState(selectedTask.title);

  const onHandleClose = () => {
    const boardLocation = '/b/' + boardId + '';
    props.history.push(boardLocation);
  };

  const onHandleChange = async () => {
    console.log('taskTitle', taskTitle);
    const newTask = selectedTask;
    newTask.title = taskTitle;
    selectedTask.title = taskTitle;
    console.log('selectedTask', selectedTask);
    board.groups[groupIdx].tasks[taskIdx] = selectedTask;
    const action = { type: 'SET_BOARD', board };
    dispatch(action);
  };

  if (!selectedTask || !board) return <div className=''></div>;
  return (
    <Backdrop onClick={onHandleClose}>
      <div
        className='task-details flex column '
        onClick={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
        }}
      >
        {(whichBgcExist) ? <div className='task-header-cover' style={(whichBgcExist.includes('#') || whichBgcExist.includes('rgb')) ? { backgroundColor: `${selectedTask.cover.background}` }
          : { backgroundImage: `url(${whichBgcExist})`, backgroundColor: '#415647a6' }}>
            <CloseIcon className='close-button' onClick={onHandleClose} />
            <CoverModal
              updateTask={updateTask}
              setIsColorPicked={setIsColorPicked}
              isColorPicked={isColorPicked}
              board={board}
              groupIdx={groupIdx}
              taskIdx={taskIdx}
              task={selectedTask}
            />
        </div> : <CloseIcon className='close-button' onClick={onHandleClose} />}
        <div className='window-header align-center flex space-between'>
          <div className='task-title flex align-center'>
            <WebAssetIcon sx={{ marginTop: 0.5 }} />
          <div className="task-title-container flex">
            <input
              className='task-title-input'
              defaultValue={selectedTask.title}
              onBlur={onHandleChange}
              onFocus={(ev) => {
                ev.currentTarget.select();
              }}
              onClick={(ev) => {
                ev.currentTarget.select();
              }}
              onChange={(ev) => setTaskTitle(ev.target.value)}
            />
          </div>
            <div className="group-title">
              <p>in list {group.title}</p>
            </div>
          </div>
        </div>

        <div className='task-main-container'>
          <div className='main-content'>
            <div className='task-info flex align-center'>
              <MembersCmp members={selectedTask.members} />
              {selectedTask.dueDate.length > 0 && (
                <DueDateCmp dueDate={selectedTask.dueDate} />
              )}
            </div>
            <LabelsCmp 
            key={utilService.makeId()}
            task={selectedTask}
            groupIdx={groupIdx}
            board={board}
            taskIdx={taskIdx}
            labels={selectedTask.labels} />
            <div className='description-container'>
              <div className='description flex'>
                <SubjectIcon />
                <p>Description</p>
              </div>
              <div className='add-description-container'>
                <Textarea />
              </div>
            </div>
            <CheckListCmp
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
              attachments={selectedTask.attachments}
                task={selectedTask}
                board={board}
                group={group}
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
                    }}
                  >
                    <p>NC</p>
                  </Avatar>
                </div>
                <AddCommentCmp
                  task={selectedTask}
                  board={board}
                  group={group}
                />
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
            <LabelsModal 
            key={utilService.makeId()}
            task={selectedTask}
            groupIdx={groupIdx}
            board={board}
            taskIdx={taskIdx} />
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
              className='button-container flex'
            >
              <QueryBuilderIcon color='action' />
              <Typography>Dates</Typography>
              <DatePickerModal
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
            />
            {/* {(!selectedTask.cover && !selectedTask.cover.background) &&  */}
            {(!whichBgcExist) && <CoverModal
              updateTask={updateTask}
              setIsColorPicked={setIsColorPicked}
              isColorPicked={isColorPicked}
              board={board}
              groupIdx={groupIdx}
              taskIdx={taskIdx}
              task={selectedTask}
            />}
            {/* } */}
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
