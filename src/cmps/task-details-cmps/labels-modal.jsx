import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import AddIcon from '@mui/icons-material/Add';

import { saveBoard } from '../../store/actions/board.action';

export const LabelsModal = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { board, groupIdx, taskIdx, task } = props;
  const isFromInnerWindow = props.source ? true : false;
  const [isEditing, setIsEditing] = useState(false);
  const [currLabelId, setCurrLabelId] = useState(null);
  const [labelTitle, setLabelTitle] = useState('');
  // const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.preventDefault();
    setIsEditing(false);
    setAnchorEl(null);
  };

  const onHandleLabelTitle = ({ target }) => {
    const value = target.value;
    setLabelTitle(value);
  };

  const onHandleEditing = (labelId, name) => {
    setLabelTitle(name);
    setIsEditing(!isEditing);
    setCurrLabelId(labelId);
  };

  const applyLabelTitle = (index, labelId) => {
    board.labels[index].name = labelTitle;
    const labelIdx = task.labels.findIndex((label) => {
      return label._id === labelId;
    });
    if (labelIdx !== -1) {
      task.labels[labelIdx].name = labelTitle;
      board.groups[groupIdx].tasks[taskIdx] = task;
    }
    try {
      dispatch(saveBoard(board));
    } catch (err) {
      console.log('Cannot apply label name', err);
    }
    // if (!isEditing || labelId !== currLabelId) setLabelTitle('');
  };

  const onHandlePick = (ev, labelId) => {
    const isExist = task.labels.findIndex((label) => {
      return label._id === labelId;
    });
    if (isExist !== -1) return onRemoveLabel(labelId);
    else onAddLabel(labelId);
  };

  const onRemoveLabel = (labelId) => {
    const labelIdx = task.labels.findIndex((label) => {
      return label._id === labelId;
    });
    // const activity = boardService.addTaskActivity(`removed label (${task.labels[labelIdx].bgc}) from ${task.title}`, task, loggedInUser)
    // if (activity) board.activities.unshift(activity);
    task.labels.splice(labelIdx, 1);
    onSaveChanges();
  };

  const onAddLabel = (labelId) => {
    const label = board.labels.find((currLabel) => {
      return currLabel._id === labelId;
    });
    // const activity = boardService.addTaskActivity(`added label (${label.bgc}) to ${task.title}`, task, loggedInUser)
    // if (activity) board.activities.unshift(activity);
    task.labels.push(label);
    onSaveChanges();
  };

  const onSaveChanges = () => {
    try {
      board.groups[groupIdx].tasks[taskIdx] = task;
      dispatch(saveBoard(board));
    } catch (err) {
      console.log('Cant add / remove label', err);
    }
  };

  return (
    <div className='button-container flex align-center'>
      <div
        className='flex align-center'
        style={isFromInnerWindow ? { opacity: '0' } : null}
      >
        {props.from !== 'mini-menu' ? (
          <LocalOfferOutlinedIcon color='action' onClick={handleClick} />
        ) : (
          <TurnedInNotIcon
            sx={{ fontSize: 'medium', marginInlineEnd: '5px' }}
          />
        )}
        <Typography onClick={handleClick}>Labels</Typography>
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
          <div className='labels-task-modal flex justify-center'>
            Labels
            <a onClick={handleClose}> {/* Change to button */}✕</a>
          </div>
          <div className='labels-modal flex column'>
            <span>Labels</span>
            <section className='labels-picker'>
              {board.labels.map((label, index) => {
                return (
                  <div key={index} className='color-label flex'>
                    <button
                      onClick={(ev) => {
                        onHandlePick(ev, label._id);
                      }}
                      style={{ backgroundColor: `${label.bgc}` }}
                    >
                      {isEditing && currLabelId === label._id ? (
                        <input
                          autoFocus
                          placeholder={label.name}
                          onChange={(ev) => onHandleLabelTitle(ev)}
                        ></input>
                      ) : (
                        <p>{label.name}</p>
                      )}
                      {task.labels.findIndex((currLabel) => {
                        return currLabel._id === label._id;
                      }) !== -1 && (
                        <TurnedInNotIcon sx={{ fontSize: 'medium' }} />
                      )}
                    </button>
                    <div
                      onClick={() => {
                        applyLabelTitle(index, label._id);
                      }}
                    >
                      {(!isEditing || label._id !== currLabelId) && (
                        <CreateOutlinedIcon
                          onClick={() => {
                            onHandleEditing(label._id, label.name);
                          }}
                          sx={{ fontSize: 'large' }}
                        />
                      )}
                      {isEditing && label._id === currLabelId && (
                        <AddIcon
                          onClick={() => {
                            onHandleEditing(label._id, label.name);
                          }}
                          sx={{ fontSize: 'large' }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        </div>
      </Popover>
    </div>
  );
};
