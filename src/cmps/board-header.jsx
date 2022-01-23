import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';

import STATS from '../assets/img/stats.svg';
import DOWNICON from '../assets/img/down-arrow.png';
import ADD_MEMBER from '../assets/img/add-user.png';
import FILTER from '../assets/img/filter.svg';
import MENU from '../assets/img/menu.png';
import AVATAR1 from '../assets/img/avatar1.png';
import AVATAR2 from '../assets/img/avatar2.png';
import AVATAR3 from '../assets/img/avatar3.png';
import AVATAR4 from '../assets/img/avatar4.png';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import { boardService } from '../services/board.service';

export const BoardHeader = (props) => {
  const board = props.board;
  const [boardTitle, setBoardTitle] = useState(board.title);

  const onHandleChange = async () => {
    const newBoard = board;
    newBoard.title = boardTitle;
    boardService.saveBoard(board);
    await props.onLoadBoard();
  };

  if (!board) return <h1> No board </h1>;

  // const bLength = board.title.length || 50;
  return (
    <section className='upper-header flex'>
      <div className='info-details flex align-center'>
        <div className='board-stats board-header-btn flex align-center space-between'>
          <img src={STATS} alt='stats' />
          <span>Board</span>
          <img
            src={DOWNICON}
            alt='down-icon'
            style={{ width: '10px', height: '10px' }}
          />
        </div>

        <input
          // style={{ width: `${board.title.length*14}` + '10px' }}
          className='title-input'
          defaultValue={board.title}
          onBlur={onHandleChange}
          onChange={(ev) => setBoardTitle(ev.target.value)}
        />
        <div className='rating-container flex align-center justify-center'>
          <Rating name='half-rating' defaultValue={0} precision={1} max={1} />
        </div>
        <span className='board-header-btn-divider'></span>
        <button className='board-header-btn flex align-center'>
          Workspace
        </button>
        <span className='board-header-btn-divider'></span>
        <div className='workspace-type flex'>
          <PeopleAltOutlinedIcon />
          <button className='flex align-center'>Workspace visible</button>
        </div>
        <span className='board-header-btn-divider'> </span>
        <div className='members-avatars'>
          <AvatarGroup
          sx={{gap: 0.5}}
          max={3}>
            <Avatar
              alt='NC'
              src={AVATAR1}
              style={{ width: '28px', height: '28px',border: '0' }}
            />
            <Avatar
              alt='NG'
              src={AVATAR2}
              style={{ width: '28px', height: '28px',border: '0' }}
            />
            <Avatar
              alt='NA'
              src={AVATAR3}
              style={{ width: '28px', height: '28px',border: '0' }}
            />
          </AvatarGroup>
        </div>
        <Button
          className='new-member flex'
          style={{ backgroundColor: '#0179bf' }}
          variant='contained'>
          <img
            src={ADD_MEMBER}
            alt='invite'
            style={{ width: '12px', height: '12px' }}
          />
          <a>Invite</a>
        </Button>
      </div>
      <div className='upper-options flex align-center'>
        <div className='board-header-btn automation flex align-center space-evenly'>
          <img
            src='https://a.trellocdn.com/prgb/dist/images/butler/automation-dark.8548e886880fadc385da.svg'
            alt='automation'
            style={{ width: '16px', height: '16px' }}
          />
          <span>Automation</span>
        </div>
        <span className='board-header-btn-divider'></span>
        <div className='board-header-btn filter flex align-center space-evenly'>
          <img
            src={FILTER}
            alt='filter'
            style={{ width: '16px', height: '16px' }}
          />
          <span>Filter</span>
        </div>
        <div className='board-header-btn menu-container flex align-center space-evenly'>
          <img
            src={MENU}
            alt='menu'
            style={{ width: '16px', height: '16px' }}
          />
          <span className='span-width'>Show menu</span>
        </div>
      </div>
    </section>
  );
};
