import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

import { utilService } from '../services/util.service';

export const LabelsModal = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { board, groupIdx, taskIdx, task } = props;
  const isFromInnerWindow = props.source ? true : false;
  const [isEditing, setIsEditing] = useState(false);
  const [currLabelId, setCurrLabelId] = useState(null);
  const [labelTitle, setLabelTitle] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);

  };

  const onHandleLabelTitle = ({ target }) => {
    const value = target.value;
    setLabelTitle(value);
  };

  const onHandleEditing = (labelId) => {
    setIsEditing(!isEditing);
    setCurrLabelId(labelId);
  };

  const applyLabelTitle = async (index, labelId) => {
    board.labels[index].name = labelTitle;
    const labelIdx = task.labels.findIndex((label) => {
      return label._id === labelId;
    });
    if (labelIdx !== -1) {
      task.labels[labelIdx].name = labelTitle;
      board.groups[groupIdx].tasks[taskIdx] = task;
    }
    try {
      const action = { type: 'SET_BOARD', board };
      await dispatch(action);
    } catch (err) {
      console.log('Cannot apply label name', err);
    }
  };

  const onHandlePick = (ev, labelId) => {
    const isExist = task.labels.findIndex((label) => {
      return label._id === labelId;
    });
    setAnchorEl(ev.currentTarget);
    if (isExist !== -1) return onRemoveLabel(labelId);
    else onAddLabel(labelId);
  };

  const onRemoveLabel = (labelId) => {
    const labelIdx = task.labels.findIndex((label) => {
      return label._id === labelId;
    });
    const activity = {
      _id: utilService.makeId(),
      txt: `removed label (${task.labels[labelIdx].bgc}) from ${task.title}`,
      createdAt: Date.now(),
      byMember: 'Guest',
      task: {
        _id: task._id,
        title: task.title,
      },
    };
    board.activities.unshift(activity);
    task.labels.splice(labelIdx, 1);
    onSaveChanges();
  };

  const onAddLabel = (labelId) => {
    const label = board.labels.find((currLabel) => {
      return currLabel._id === labelId;
    });
    const activity = {
      _id: utilService.makeId(),
      txt: `added label (${label.bgc}) to ${task.title}`,
      createdAt: Date.now(),
      byMember: 'Guest',
      task: {
        _id: task._id,
        title: task.title,
      },
    };
    board.activities.unshift(activity);
    task.labels.push(label);
    onSaveChanges();
  };

  const onSaveChanges = async () => {
    try {
      board.groups[groupIdx].tasks[taskIdx] = task;
      const action = { type: 'SET_BOARD', board };
      await dispatch(action);
    } catch (err) {
      console.log('Cant add / remove label', err);
    }
  };

  return (
    <div className='button-container flex align-center'>
      <div
        className='flex align-center'
        style={isFromInnerWindow ? { opacity: '0' } : null}>
        <LocalOfferOutlinedIcon color='action' onClick={handleClick} />
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
                  <div
                    key={index}
                    onBlur={() => applyLabelTitle(index, label._id)}
                    className='color-label'>
                    <button
                      onClick={(ev) => {
                        onHandlePick(ev, label._id);
                      }}
                      style={{ backgroundColor: `${label.bgc}` }}>
                      {isEditing && currLabelId === label._id ? (
                        <input
                          autoFocus
                          defaultValue={label.name}
                          onChange={(ev) => onHandleLabelTitle(ev)}></input>
                      ) : (
                        <p>{label.name}</p>
                      )}
                      {task.labels.findIndex((currLabel) => {
                        return currLabel._id === label._id;
                      }) !== -1 && <span>✓</span>}
                    </button>
                    <CreateOutlinedIcon
                      onClick={() => onHandleEditing(label._id)}
                      sx={{ fontSize: 'large' }}
                    />
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
