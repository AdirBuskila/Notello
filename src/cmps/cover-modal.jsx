import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';

import {utilService} from '../services/util.service'

export const CoverModal = (props) => {
  console.log("props: ", props);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {board, groupIdx, taskIdx, task, isColorPicked} = props;
  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };



  const onHandlePick = (ev) => {
    console.log('getComputedStyle(ev.target)', getComputedStyle(ev.target));
    // const bgc = getComputedStyle(ev.target).backgroundColor;
    // task.cover = bgc;
    // board.groups[groupIdx].tasks[taskIdx] = task;
    // const action = {type: 'SET_BOARD', board}
    // dispatch(action);
    // props.setIsColorPicked(!isColorPicked);
  };

  const onAddClick = () => {
  }

  return (
    <div className='button-container flex'>
      <CropOriginalIcon onClick={handleClick} color='action' />
      <Typography onClick={handleClick}>Cover</Typography>
     <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <div sx={{ p: 0.5, width: '304px'}}>
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
                <div className='half-header'>
                  <section className='top-half'></section>
                  <section className='bottom-half'></section>
                </div>
              <div className='full-header'></div>
            </section>
              <button className='remove-btn'>Remove cover</button>
            </div>
              <span>Copy items from</span>
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