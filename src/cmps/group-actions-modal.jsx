import React, { useState, useEffect } from 'react';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { orange, blue, red } from '@mui/material/colors';
import { Avatar } from '@mui/material';
import WhiteArrow from '../assets/img/white-bold-arrow-down.png';
import { utilService } from '../services/util.service';
import { useHistory, Link } from 'react-router-dom';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch } from 'react-redux';


export const GroupActionsModal = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const dispatch = useDispatch()

  const { board, groupIdx } = props;

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const onHandleModal = (ev) => {
    ev.preventDefault();
    setOpen(false);
  };

    const onDelete = async () => {
        debugger
        try {
          /////////////////////////// CODE BREAKS HERE //////////////////////////////////////////////////
          /////////////////////////// HA-CHANA LE-MAZGAN //////////////////////////////////////////////////
            board  = board.groups.splice(groupIdx,1)[0]
            const action = { type: 'SET_BOARD', board };
            await dispatch(action);
            debugger
    } catch (err) {
        console.log(`Cant delete board`, err);
    }
    setOpen(false)
}





  return (
    <div
      onBlur={() => {
        setOpen(false);
      }}
    >
    <MoreHorizIcon 
    onClick={handleClick('right-end')}
    style={{ fill: '#6b778c' }} />
      <Popper
        className='popper'
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <div
                className='workspace-dropdown flex column align-center'
                style={{ height: '200px' }}
              >
                <div className='workspace-modal-title flex'>
                  List Actions
                  <a href='#' onClick={(ev) => onHandleModal(ev)}>
                    ✕
                  </a>
                </div>
                <hr />
                <div className="span-container">
                <p
                onClick={onDelete}
                 >Delete</p>
                </div>
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};
