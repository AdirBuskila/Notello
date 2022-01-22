// import * as React from 'react';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';

import STATS from '../assets/img/stats.svg'
import DOWNICON from '../assets/img/down-arrow.png'
import ADD_MEMBER from '../assets/img/add-user.png'
import INVITE from '../assets/img/invite.svg'
import FILTER from '../assets/img/filter.svg'
import MENU from '../assets/img/menu.png'
import AVATAR1 from '../assets/img/avatar1.png'
import AVATAR2 from '../assets/img/avatar2.png'
import AVATAR3 from '../assets/img/avatar3.png'
import AVATAR4 from '../assets/img/avatar4.png'

import { boardService } from '../services/board.service';


export const BoardHeader = (props) => {
  const board = props.board;

  const onHandleChange = ({ target }) => {
    const value = target.value;
    board.title = value;
    boardService.saveBoard(board)
  }

  if (!board) return (<h1> No board </h1>)
  return (
    <section className='upper-header flex'>
      <div className='info-details'>

        <div className='board-stats board-header-btn'>
          <img src={STATS} alt="stats" />
          <span>
            Board
          </span>
          <img src={DOWNICON} alt="down-icon" style={{ width: '10px', height: '10px' }} />
        </div>
        <input defaultValue={board.title} onChange={onHandleChange} />
        <Rating name="half-rating" defaultValue={0} precision={1} max={1} />
        <span className='board-header-btn-divider'></span>
        <button className='board-header-btn' >Workspace</button>
        <span className='board-header-btn-divider'></span>
        <button className='board-header-btn'>Workspace visible</button>
        <span className='board-header-btn-divider'></span>
        <div className='members-avatars'>
          <AvatarGroup max={3}>
            <Avatar alt="NC" src={AVATAR1} style={{ width: '35px', height: '35px' }} />
            <Avatar alt="NG" src={AVATAR2} style={{ width: '35px', height: '35px' }} />
            <Avatar alt="NA" src={AVATAR3} style={{ width: '35px', height: '35px' }} />
          </AvatarGroup>
        </div>
        <Button style={{backgroundColor: '#0179bf'}} variant="contained">
          <img src={ADD_MEMBER} alt="invite" style={{ width: '20px', height: '20px' }} />
          <a>Invite</a>
        </Button>
      </div>
      <div className='upper-options flex'>
        <div className='board-header-btn flex'>
          <img src="https://a.trellocdn.com/prgb/dist/images/butler/automation-dark.8548e886880fadc385da.svg" alt="automation" style={{ width: '20px', height: '20px' }} />
          <span>Automation</span>
        </div>
        <span className='board-header-btn-divider'></span>
        <div className='board-header-btn'>
          <img src={FILTER} alt="filter" style={{ width: '20px', height: '20px' }} />
          <span>Filter</span>
        </div>
        <div className='board-header-btn'>
          <img src={MENU} alt="menu" style={{ width: '20px', height: '20px' }} />
          <span className='span-width'>Show menu</span>
        </div>
      </div>
    </section>
  )
};
