import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {saveBoard} from '../store/actions/board.action';
import {CopyLinkPopper} from './copy-link-pop';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
// import { BoardActivity } from '../pages/board-activity';
import STATS from '../assets/img/stats.svg';
import DOWNICON from '../assets/img/down-arrow.png';
import FILTER from '../assets/img/filter.svg';
import MENU from '../assets/img/menu.png';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

export const BoardHeader = props => {
  const board = useSelector(state => state.boardModule.board);
  const [boardTitle, setBoardTitle] = useState(board?.title);
  const [boardTitleLen, setBoardTitleLen] = useState(board?.title?.length);
  const [value, setValue] = useState(+board?.starred);

  const dispatch = useDispatch();
  useEffect(() => {
    setBoardTitle(board?.title);
    setBoardTitleLen(board.title?.length);
  }, [board.title]);

  const onHandleChange = ev => {
    setBoardTitle(ev.target.value);
    setBoardTitleLen(boardTitle?.length);
  };

  const changeBoardTitle = ev => {
    ev.preventDefault();
    ev.currentTarget.nodeName === 'INPUT'
      ? ev.currentTarget.blur()
      : ev.currentTarget.firstChild.blur();
    const newBoard = {...board, title: ev.target.value};
    dispatch(saveBoard(newBoard));
  };

  if (!board) return <h1> No board </h1>;
  return (
    <section className='upper-header flex'>
      <div className='info-details flex align-center'>
        <div className='board-stats board-header-btn flex align-center space-around'>
          <img src={STATS} alt='stats' />
          <span>Board</span>
          <img
            src={DOWNICON}
            alt='down-icon'
            style={{width: '10px', height: '10px'}}
          />
        </div>

        <form
          onSubmit={changeBoardTitle}
          className='title-container'
          style={{width: boardTitleLen * 14.2 + 'px'}}>
          <input
            className='title-input'
            defaultValue={boardTitle}
            onBlur={changeBoardTitle}
            onFocus={ev => {
              ev.currentTarget.select();
            }}
            onClick={ev => {
              ev.currentTarget.select();
            }}
            onChange={onHandleChange}
          />
        </form>
        <div className='rating-container flex align-center justify-center'>
          {/* <Rating name='half-rating' value={null} precision={1} max={1} />           */}
          <Rating
            name='simple-controlled'
            value={value}
            max={1}
            onChange={(_, newValue) => {
              board.starred = !board.starred;
              setValue(newValue);
            }}
          />
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
          <AvatarGroup sx={{gap: 0.5}} max={4}>
            <Avatar
              alt='NG'
              src={
                'https://res.cloudinary.com/dubjerksn/image/upload/v1643131873/Notello/NG_e1fglp.png'
              }
              style={{width: '28px', height: '28px', border: '0'}}
            />
            <Avatar
              alt='NC'
              src={
                'https://res.cloudinary.com/dubjerksn/image/upload/v1643131867/Notello/NC_foadck.png'
              }
              style={{width: '28px', height: '28px', border: '0'}}
            />
            <Avatar
              alt='AB'
              src={
                'https://res.cloudinary.com/dubjerksn/image/upload/v1643131869/Notello/AB_pplonl.png'
              }
              style={{width: '28px', height: '28px', border: '0'}}
            />
            <Avatar
              alt='IG'
              src={
                'https://res.cloudinary.com/dubjerksn/image/upload/v1643212002/Notello/T02BJ4W8H45-U02E0QXA9PD-8469fc199211-512_a1jdtm.jpg'
              }
              style={{width: '28px', height: '28px', border: '0'}}
            />
          </AvatarGroup>
        </div>
        <CopyLinkPopper />
      </div>
      <div className='upper-options flex align-center'>
        <div className='board-header-btn automation flex align-center space-evenly'>
          <img
            src='https://a.trellocdn.com/prgb/dist/images/butler/automation-dark.8548e886880fadc385da.svg'
            alt='automation'
            style={{width: '16px', height: '16px'}}
          />
          <span>Automation</span>
        </div>
        <span className='board-header-btn-divider'></span>
        <div className='board-header-btn filter flex align-center space-evenly'>
          <img
            src={FILTER}
            alt='filter'
            style={{width: '16px', height: '16px'}}
          />
          <span>Filter</span>
        </div>
        <div
          className='board-header-btn menu-container flex align-center space-evenly'
          onClick={() => {
            props.setMenuOpen(true);
          }}>
          <img src={MENU} alt='menu' style={{width: '16px', height: '16px'}} />
          <p>Show menu</p>
          {/* <BoardActivity board={board}/> */}
        </div>
      </div>
    </section>
  );
};
