import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { utilService } from '../services/util.service';
import { boardService } from '../services/board.service';
import { saveBoard } from '../store/actions/board.action';

export const CopyMoveModal = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { board, groupIdx, task, type } = props;
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
  const [newCardTitle, setNewCardTitle] = useState(task.title + ' copy');
  const [keepChecklistsInitial, setKeepChecklistsInitial] = useState(true);
  const [keepLabelsInitial, setKeepLabelsInitial] = useState(true);
  const [keepGroupInitial, setKeepGroupInitial] = useState(groupIdx);
  const history = useHistory();
  const dispatch = useDispatch();
  let newTask = task;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const onHandleTitleChange = ({ target }) => {
    setNewCardTitle(target.value);
  };

  const onHandleChecklists = () => {
    setKeepChecklistsInitial(!keepChecklistsInitial);
  };

  const onHandleLabels = () => {
    setKeepLabelsInitial(!keepLabelsInitial);
  };

  const onHandleGroupChange = ({ target }) => {
    setKeepGroupInitial(target.value);
  };

  const onHandleSave = () => {
    newTask._id = utilService.makeId();
    newTask.title = newCardTitle;
    newTask.checklists = keepChecklistsInitial ? task.labels : [];
    newTask.labels = keepLabelsInitial ? task.labels : [];
    board.groups[+keepGroupInitial].tasks.unshift(newTask);
    const activity = boardService.addTaskActivity(
      `copied task ${task.title} group ${keepGroupInitial}`,
      task._id,
      task.title,
      loggedInUser
    );
    board.activities.unshift(activity);
    submitChanges(board);
    history.push(`/b/${board._id}/${newTask._id}`);
  };

  const submitChanges = (board) => {
    try {
      setNewCardTitle('');
      dispatch(saveBoard(board));
    } catch (err) {
      console.log('Cant handle card copy / move :', err);
    }
  };

  return (
    <div className='button-container flex align-center'>
      <div className='flex align-center'>
        {props.from !== 'mini-menu' ? (
          <ContentCopyOutlinedIcon onClick={handleClick} color='action' />
        ) : (
          <ContentCopyIcon
            sx={{ fontSize: 'medium', marginInlineEnd: '5px' }}
          />
        )}
        <Typography onClick={handleClick}>Copy</Typography>
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div sx={{ p: 0.5, width: '304px' }}>
          <div className='copy-move-task-modal flex justify-center'>
            {type === 'copy' ? <p>Copy card</p> : <p>Move</p>}
            <a onClick={handleClose}>✕</a>
          </div>
          <div className='copy-move-modal flex column'>
            <span>Copy</span>
            <textarea
              autoFocus
              defaultValue={task.title + ' copy'}
              onChange={(ev) => onHandleTitleChange(ev)}
            ></textarea>
            <span>Keep...</span>
            <section className='keep-section flex column'>
              <div className='inner-keepers flex align-center'>
                <input
                  onChange={onHandleChecklists}
                  type='checkbox'
                  defaultChecked={true}
                  name='checklist'
                />
                <label htmlFor='checklist'>
                  Checklists ({`${task.checklists.length}`})
                </label>
              </div>
              <div className='inner-keepers flex align-center'>
                <input
                  onChange={onHandleLabels}
                  type='checkbox'
                  defaultChecked={true}
                  name='labels'
                />
                <label htmlFor='labels'>
                  Labels ({`${task.labels.length}`})
                </label>
              </div>
            </section>
            <span>Copy to...</span>
            <select onChange={(ev) => onHandleGroupChange(ev)} name='group'>
              {board.groups.map((group, index) => {
                return (
                  <option key={index} value={index}>
                    {group.title}
                  </option>
                );
              })}
            </select>
            <button className='save-button' onClick={onHandleSave}>
              Create card
            </button>
          </div>
        </div>
      </Popover>
    </div>
  );
};
