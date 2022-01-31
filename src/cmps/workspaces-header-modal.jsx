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

export const WorkspacesHeaderModal = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  const [showAll, setShowAll] = useState(false);
  const history = useHistory();

  const { boards } = props;

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const onHandleModal = (ev) => {
    ev.preventDefault();
    setOpen(false);
  };

  const onHandleForwarding = (boardId) => {
    history.push(`/b/${boardId}`);
  };

  const boardsHeight = 6 * 60 + 'px';
  const btnContent = showAll ? 'Show Less' : 'Show More';
  return (
    <div>
      <Button
        className='header-board flex'
        onClick={handleClick('bottom-start')}>
        <span>Workspaces</span>
        <img src={WhiteArrow} alt='arrow' />
      </Button>
      <Popper
        className='popper'
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <div className='workspace-dropdown flex column align-center'>
                <div className='workspace-modal-title flex'>
                  Workspace
                  <a href='#' onClick={(ev) => onHandleModal(ev)}>
                    ✕
                  </a>
                </div>
                <div className='span-container'>
                  <p>Your Boards</p>
                </div>
                <div className='boards-dropdown-container flex'>
                  {boards.map((board, idx) => {
                    if (idx > 4 && !showAll) return;
                    let boardCharacter = board.title.charAt(0);
                    let boardStyle = !board.style.imgUrl
                      ? `${board.style.bgColor}`
                      : `url(${board.style.imgUrl})`;
                    return (
                      <Link key={board._id} to={`/b/${board._id}`}>
                        <div className='board-drop-preview flex align-center'>
                          <div className='board-square-container flex align-center'>
                            <div
                              style={{ backgroundImage: boardStyle }}
                              className='board-square flex align-center justify-center'>
                              <p className='board-character'>
                                {boardCharacter}
                              </p>
                            </div>
                            <p className='board-title'>{board.title}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <button
                  onClick={() => {
                    setShowAll(!showAll);
                  }}>
                  {btnContent}
                </button>
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};
