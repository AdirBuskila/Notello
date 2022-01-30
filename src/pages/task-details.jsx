import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as React from 'react';
import { utilService } from '../services/util.service';
import { MembersCmp } from '../cmps/task-details-cmps/members-cmp';
import { LabelsCmp } from '../cmps/task-details-cmps/labels-cmp';
import { AddDescription } from '../cmps/task-details-cmps/textarea-task-description';
import { AddCommentCmp } from '../cmps/task-details-cmps/textarea-task-comment';
import { CheckListModal } from '../cmps/check-list-modal';
import { CommentsSection } from '../cmps/task-details-cmps/comments-section';
import { LabelsModal } from '../cmps/details-labels';
import { AttachmentsCmp } from '../cmps/task-details-cmps/attachments-cmp';
import { AttachmentModal } from '../cmps/task-details-cmps/attachment-modal';
import { DatePickerModal } from '../cmps/task-details-cmps/date-picker-modal';
import { CheckListCmps } from '../cmps/check-list-cmps';
import { CoverModal } from '../cmps/cover-modal';
import { Backdrop } from '../cmps/UI/backdrop';
///// CMPS
import { boardService } from '../services/board.service';
///// ICONS
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import SubjectIcon from '@mui/icons-material/Subject';
import { DueDateCmp } from '../cmps/task-details-cmps/due-date-cmp';
import { MembersModal } from '../cmps/task-details-cmps/members-modal';
import { ArchiveModal } from '../cmps/details-archive';
import { CopyMoveModal } from '../cmps/copy-move-details';
import { JoinCmp } from '../cmps/task-details-cmps/join-member';
import { EditDescription } from '../cmps/task-details-cmps/description-edit';
import { loadBoard, saveBoard } from '../store/actions/board.action';

export const TaskDetails = (props) => {
  const { useState } = React;
  const dispatch = useDispatch();
  const currBoard = useSelector((state) => state.boardModule.board);
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
  const params = useParams();
  const boardId = params.boardId;
  const taskId = params.id;
  const [board, setBoard] = useState(currBoard);
  const [group, setGroup] = useState({});
  const [selectedTask, updateTask] = useState('');
  const [groupIdx, setGroupIdx] = useState('');
  const [taskIdx, setTaskIdx] = React.useState('');
  const [activityOpen, setActivityOpen] = React.useState(false);

  const whichBgcExist = selectedTask.cover
    ? selectedTask.cover.background
    : null;

  React.useEffect(() => {
    (async () => {
      try {
        const newBoard = await boardService.getById(boardId);
        const newGroup = boardService.getGroup(newBoard, taskId);
        setBoard(newBoard);
        setGroup(newGroup);
        await onLoadTask(board, newGroup, taskId);
      } catch (err) {
        console.log('Cant load board');
      }
    })();
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
    const newTask = selectedTask;
    newTask.title = taskTitle;
    selectedTask.title = taskTitle;
    const activity = boardService.addTaskActivity(
      `changed task ${selectedTask.title} title to - ${taskTitle}`,
      selectedTask._id,
      selectedTask.title,
      loggedInUser
    );
    try {
      if (activity) board.activities.unshift(activity);
      board.groups[groupIdx].tasks[taskIdx] = selectedTask;
      dispatch(saveBoard(board));
      // const action = { type: 'SET_BOARD', board };
      // dispatch(action);
    } catch (err) {
      console.log('Cannot change task title');
    }
  };

  const [editMode, setEditMode] = React.useState(false);

  if (!selectedTask || !board) return <div className=''></div>;

  const inside = selectedTask.members.find((member) => {
    return member._id === loggedInUser._id;
  });
  return (
    <React.Fragment>
      <div className='task-details-container'>
        <Backdrop onClick={onHandleClose} />
        <div className='task-details flex column '>
          {whichBgcExist ? (
            <div
              className='task-header-cover'
              style={
                whichBgcExist.includes('#') || whichBgcExist.includes('rgb')
                  ? { backgroundColor: `${selectedTask.cover.background}` }
                  : {
                      backgroundImage: `url(${whichBgcExist})`,
                      backgroundColor: '#415647a6',
                    }
              }>
              <div className='close-button flex align-center end'>
                <CloseIcon onClick={onHandleClose} />
              </div>
              <CoverModal
                updateTask={updateTask}
                board={board}
                groupIdx={groupIdx}
                taskIdx={taskIdx}
                task={selectedTask}
              />
            </div>
          ) : (
            <div className='close-button flex align-center end'>
              <CloseIcon onClick={onHandleClose} />
            </div>
          )}
          {selectedTask.isArchived && (
            <div className='archived-task flex align-center'>
              <DeleteOutlineIcon sx={{ color: '#42526e' }} />
              <span>This card is archived.</span>
            </div>
          )}
          <div className='window-header align-center flex space-between'>
            <div className='task-title flex align-center'>
              <WebAssetIcon sx={{ mb: 0.5 }} />
              <div className='task-title-container flex column'>
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
                <div className='group-title'>
                  <p>in list {group.title}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='task-main-container'>
            <div className='main-content'>
              <div className='task-info flex align-center'>
                <MembersCmp
                  group={group}
                  board={board}
                  task={selectedTask}
                  members={selectedTask.members}
                />
                {selectedTask.dueDate.length > 0 && (
                  <DueDateCmp
                    task={selectedTask}
                    board={board}
                    taskIdx={taskIdx}
                    groupIdx={groupIdx}
                    dueDate={selectedTask.dueDate}
                  />
                )}
              </div>
              <LabelsCmp
                // key={utilService.makeId()}
                task={selectedTask}
                groupIdx={groupIdx}
                board={board}
                taskIdx={taskIdx}
                labels={selectedTask.labels}
              />
              <div className='description-container'>
                <div className='description flex'>
                  <SubjectIcon />
                  <p>Description</p>
                  {selectedTask.description !== '' && !editMode && (
                    <div className='edit-button-container flex justify-center'>
                      <button
                        className='edit-description-button'
                        onClick={() => setEditMode(true)}>
                        Edit
                      </button>
                    </div>
                  )}
                </div>
                <div className='add-description-container'>
                  {selectedTask.description !== '' && editMode && (
                    <EditDescription
                      task={selectedTask}
                      board={board}
                      setEditMode={setEditMode}
                      group={group}
                      description={selectedTask.description}
                    />
                  )}
                  {selectedTask.description === '' && (
                    <AddDescription
                      task={selectedTask}
                      board={board}
                      group={group}
                    />
                  )}
                  {selectedTask.description !== '' && !editMode && (
                    <p className='task-description'>
                      {selectedTask.description}
                    </p>
                  )}
                </div>
              </div>
              <CheckListCmps
                key={utilService.makeId()}
                task={selectedTask}
                groupIdx={groupIdx}
                board={board}
                taskIdx={taskIdx}
                group={group}
              />
              {selectedTask.attachments?.length > 0 && (
                <div className='attachments-container'>
                  <AttachmentsCmp
                    attachments={selectedTask.attachments}
                    task={selectedTask}
                    board={board}
                    group={group}
                  />
                </div>
              )}
              <div className='activity-container flex column'>
                <div className='activity flex align-center space-between'>
                  <div className='activity-header-container flex'>
                    <FormatListBulletedIcon />
                    <p>Activity</p>
                  </div>
                  <button onClick={() => setActivityOpen(!activityOpen)}>
                    Show details
                  </button>
                </div>
                <div className='comment-container flex'>
                  <div className='user-container'>
                    <Avatar
                      src={loggedInUser.imgUrl}
                      sx={{
                        width: 32,
                        height: 32,
                      }}>
                      <p>{utilService.getInitials(loggedInUser.fullname)}</p>
                    </Avatar>
                  </div>
                  <AddCommentCmp
                    task={selectedTask}
                    board={board}
                    group={group}
                  />
                </div>
                <div className='comments-area flex column'>
                  <CommentsSection
                    task={selectedTask}
                    board={board}
                    group={group}
                    setActivityOpen={setActivityOpen}
                    activityOpen={activityOpen}
                    comments={selectedTask.comments}
                  />
                </div>
              </div>
            </div>
            <div className='window-sidebar'>
              {!inside && <p className='task-actions'>Suggested</p>}
              {!inside && (
                <JoinCmp task={selectedTask} board={board} group={group} />
              )}
              <p className='task-actions'>Add to card</p>
              <MembersModal task={selectedTask} board={board} group={group} />
              <LabelsModal
                task={selectedTask}
                groupIdx={groupIdx}
                board={board}
                taskIdx={taskIdx}
              />
              <CheckListModal
                board={board}
                groupIdx={groupIdx}
                taskIdx={taskIdx}
                task={selectedTask}
              />
              <DatePickerModal
                task={selectedTask}
                board={board}
                group={group}
              />
              <AttachmentModal
                task={selectedTask}
                board={board}
                group={group}
                attachments={selectedTask.attachments}
              />
              {/* {(!selectedTask.cover && !selectedTask.cover.background) &&  */}
              {!whichBgcExist && (
                <CoverModal
                  updateTask={updateTask}
                  board={board}
                  groupIdx={groupIdx}
                  taskIdx={taskIdx}
                  task={selectedTask}
                />
              )}
              {/* } */}
              <p className='task-actions'>Actions</p>
              <div className='button-container flex'>
                <ArrowForwardOutlinedIcon color='action' />
                <Typography>Move</Typography>
              </div>
              <CopyMoveModal
                type={'copy'}
                board={board}
                groupIdx={groupIdx}
                taskIdx={taskIdx}
                task={selectedTask}
              />
              <ArchiveModal
                board={board}
                groupIdx={groupIdx}
                taskIdx={taskIdx}
                task={selectedTask}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
