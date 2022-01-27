import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';

import { utilService } from '../services/util.service'

export const CoverModal = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { board, groupIdx, taskIdx, task } = props;
  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };


  const onHandleRemove = () => {
    const spread = (task.cover) ? task.cover.spread : 'partial';
    const cover = { background: '', spread };
    task.cover = cover;
    submitChanges(task);
  }



  const onHandlePick = (ev) => {
    const bgc = getComputedStyle(ev.target).backgroundColor;
    const spread = (task.cover) ? task.cover.spread : 'partial';
    const cover = { background: bgc, spread };
    task.cover = cover;
    submitChanges(task);
  };

  const onHandleSpreadPartial = () => {
    const cover = { background: task.cover.background, spread: 'partial' }
    task.cover = cover;
    submitChanges(task);
  }

  const onHandleSpreadFull = () => {
    const cover = { background: task.cover.background, spread: 'full' }
    task.cover = cover;
    submitChanges(task);
  }

  const submitChanges = (task) => {
    board.groups[groupIdx].tasks[taskIdx] = task;
    const action = { type: 'SET_BOARD', board };
    dispatch(action);
  }


  return (
    <div className='button-container flex align-center'>
      <VideoLabelIcon sx={{ fontSize: 'medium'}} onClick={handleClick} color='action' />
      <Typography onClick={handleClick}>Cover</Typography>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <div sx={{ p: 0.5, width: '304px' }}>
          <div className='cover-task-modal flex justify-center'>
            Cover
            <a onClick={handleClose}>
              ✕
            </a>
          </div>
          <div className='cover-modal flex column'>
            <span>Size</span>
            <div className='top-cover-modal flex column'>
              <section className='cover-style-options flex align-center'>
                <div onClick={onHandleSpreadPartial} className='half-header'>
                  <section className='top-half'></section>
                  <section className='bottom-half'></section>
                </div>
                <div onClick={onHandleSpreadFull} className='full-header'></div>
              </section>
              <button onClick={onHandleRemove} className='remove-btn'>Remove cover</button>
            </div>
            <span>Colors</span>
            <section className='color-picker'>
              <button onClick={(ev) => {
                onHandlePick(ev)
              }} className='green'></button>
              <button onClick={(ev) => {
                onHandlePick(ev)
              }} className='yellow'></button>
              <button onClick={(ev) => {
                onHandlePick(ev)
              }} className='orange'></button>
              <button onClick={(ev) => {
                onHandlePick(ev)
              }} className='red'></button>
              <button onClick={(ev) => {
                onHandlePick(ev)
              }} className='purple'></button>
              <button onClick={(ev) => {
                onHandlePick(ev)
              }} className='blue'></button>
              <button onClick={(ev) => {
                onHandlePick(ev)
              }} className='lightblue'></button>
              <button onClick={(ev) => {
                onHandlePick(ev)
              }} className='lightgreen'></button>
              <button onClick={(ev) => {
                onHandlePick(ev)
              }} className='pink'></button>
              <button onClick={(ev) => {
                onHandlePick(ev)
              }} className='darkblue'></button>
            </section>
          </div>
        </div>
      </Popover>
    </div>
  );
};