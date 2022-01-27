import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

export const LabelsModal = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { board, groupIdx, taskIdx, task } = props;
  const isFromInnerWindow = (props.source) ? true : false;
  const [isEditing, setIsEditing] = useState(false)
  const [currLabelId, setCurrLabelId] = useState(null);
  const [labelTitle, setLabelTitle] = useState('');
  const dispatch = useDispatch()
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const onHandleLabelTitle = ({ target }) => {
    const value = target.value;
    setLabelTitle(value);
  }

  const applyLabelTitle = (index, labelId) => {
    board.labels[index].name = labelTitle;
    const labelIdx = task.labels.findIndex((label) => {
      return (label._id === labelId)
    })
    if (labelIdx !== -1) {
      task.labels[labelIdx].name = labelTitle;
      board.groups[groupIdx].tasks[taskIdx] = task;
    }
    const action = { type: 'SET_BOARD', board };
    dispatch(action);
  }

  const onHandlePick = (labelId) => {
    const isExist = task.labels.findIndex((label) => {
      return (label._id === labelId)
    })
    if (isExist !== -1) return onRemoveLabel(labelId)
    else onAddLabel(labelId)
  };

  const onRemoveLabel = (labelId) => {
    const labelIdx = task.labels.findIndex((label) => {
      return (label._id === labelId)
    })
    task.labels.splice(labelIdx, 1);
    onSaveChanges()
  }

  const onAddLabel = (labelId) => {
    const label = board.labels.find((currLabel) => {
      return (currLabel._id === labelId);
    })
    task.labels.push(label);
    onSaveChanges()
  }

  const onSaveChanges = () => {
    board.groups[groupIdx].tasks[taskIdx] = task;
    const action = { type: 'SET_BOARD', board };
    dispatch(action);
  }

  return (
    <div className='button-container flex align-center'>
      <div className='flex align-center' style={isFromInnerWindow ? {opacity: '0'} : null}>
      <LocalOfferOutlinedIcon color='action' onClick={handleClick}  />
      <Typography onClick={handleClick}>Labels</Typography>
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <div sx={{ p: 0.5, width: '304px' }}>
          <div className='labels-task-modal flex justify-center'>
            Labels
            <a onClick={handleClose}>
              ✕
            </a>
          </div>
          <div className='labels-modal flex column'>
            <span>Labels</span>
            <section className='labels-picker'>

              {board.labels.map((label, index) => {
                return (
                  <div onBlur={() => applyLabelTitle(index, label._id)} className='color-label'>
                    <button
                      onClick={(ev) => {
                        onHandlePick(label._id)
                      }}
                      style={{ backgroundColor: `${label.bgc}`}}
                    >
                      {isEditing && currLabelId === label._id ? <input autoFocus defaultValue={label.name} onChange={(ev) => onHandleLabelTitle(ev)}></input>
                        : <p>{label.name}</p>}
                      {(task.labels.findIndex((currLabel) => {
                        return (currLabel._id === label._id)
                      }) !== -1) && <span>✓</span>}
                    </button>
                    <CreateOutlinedIcon onClick={() => {
                        setIsEditing(true)
                        setCurrLabelId(label._id)
                      }
                    } 
                      sx={{ fontSize: 'large' }} />
                  </div>
                )
              })}
            </section>
          </div>
        </div >
      </Popover >
    </div >
  );
};

/* 
<button onClick={(ev) => {
                  onHandlePick(ev)
                }} className='yellow'>
                  Important
                </button>
                  {(task.labels.findIndex((label) => {
                    return (label.name === 'Important')
                  }) !== -1) && <span>✓</span>}
                <CreateOutlinedIcon sx={{ fontSize: 'large' }} />
              </div>
              <div className='color-label'>
                <button onClick={(ev) => {
                  onHandlePick(ev)
                }} className='orange'>
                  QA
                </button>
                  {(task.labels.findIndex((label) => {
                    return (label.name === 'QA')
                  }) !== -1) && <span>✓</span>}
                <CreateOutlinedIcon sx={{ fontSize: 'large' }} />
              </div>
              <div className='color-label'>
                <button onClick={(ev) => {
                  onHandlePick(ev)
                }} className='red'>
                  Urgent
                </button>
                  {(task.labels.findIndex((label) => {
                    return (label.name === 'Urgent')
                  }) !== -1) && <span>✓</span>}
                <CreateOutlinedIcon sx={{ fontSize: 'large' }} />
                </div>
                <div className='color-label'>
                  <button onClick={(ev) => {
                    onHandlePick(ev)
                  }} className='lightblue'>
                    Development
                  </button>
                    {(task.labels.findIndex((label) => {
                    return (label.name === 'Development')
                  }) !== -1) && <span>✓</span>}
                  <CreateOutlinedIcon sx={{ fontSize: 'large' }} />
                </div>
                <div className='color-label'>
                  <button onClick={(ev) => {
                    onHandlePick(ev)
                  }} className='lightgreen'>
                    Done
                  </button>
                    {(task.labels.findIndex((label) => {
                    return (label.name === 'Done')
                  }) !== -1) && <span>✓</span>}
                  <CreateOutlinedIcon sx={{ fontSize: 'large' }} />
                </div>
                <div className='color-label'>
                  <button onClick={(ev) => {
                    onHandlePick(ev)
                  }} className='pink'>
                    Product
                  </button>
                    {(task.labels.findIndex((label) => {
                    return (label.name === 'Product')
                  }) !== -1) && <span>✓</span>}
                  <CreateOutlinedIcon sx={{ fontSize: 'large' }} /> */