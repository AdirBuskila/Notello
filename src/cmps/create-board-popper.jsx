import * as React from 'react';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { boardService } from '../services/board.service';

export const CreateBoardPopper = (props) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [placement, setPlacement] = React.useState();
  const [preview, setPreview] = React.useState({ background: 'black' });
  const [boardTitle, setBoardTitle] = React.useState('');
  const [boardStyle, setBoardStyle] = React.useState('');
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
  const dispatch = useDispatch();

  const handleBoardSubmit = () => {
  const { setNewBoard } = props;

    if (!boardTitle) return;
    const board = {
      title: boardTitle,
      createdAt: Date.now(),
      createdBy: loggedInUser,
      style: boardStyle,
      isStarred: false,
    };
    boardService.save(board);
    setNewBoard(false);
    setOpen(false)

  };

  const onHandleChange = ({ target }) => {
    const value = target.value;
    setBoardTitle(value);
  };

  const handleClick = (newPlacement) => (event) => {
    props.setNewBoard(true)
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
    getPhotosForLoad();
  };
  const onHandleModal = (ev) => {
    ev.preventDefault();
    setOpen(false);
  };
  const getPhotosForLoad = async () => {
    try {
      const photos = await axios.get(
        'https://api.unsplash.com/search/photos?query=work&client_id=qUk-G2PG9c7CPbC3iLZO7d7ndV_Ltk0BjU1IwkBNS7k'
      );
      console.log('photos.data.results', photos.data.results);
      changeDivBackground(photos.data.results);
    } catch (err) {
      console.log('cannot load photos ', err);
    }
  };

  const changeDivBackground = (photos) => {
    const PhotosObj = photos.map((photo)=> {
      return {
        small: photo.urls.small,
        full: photo.urls.full,
      }
    })
    PhotosObj.map((photo, index) => {
      if (index > 3) return;
      const div = document.getElementsByClassName(`background-img-${index}`)[0];
      const btn = document.getElementsByClassName(`btn-img${index}`)[0]
      div.src = `${photo.full}`;
      btn.on =('click',setPreview(`${photo.full}`))
    });
  };

  const handleImgClick = (ev) => {
    const newPreview = { background: `url(${ev.target.currentSrc})` };
    setPreview(newPreview);
    setBoardStyle({ imgUrl: `${ev.target.currentSrc}` });
  };
  const handleColorClick = (color) => {
    const newPreview = { backgroundColor: `${color}` };
    setPreview(newPreview);
    setBoardStyle({ bgColor: `${color}` });
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <div>
      <div onClick={handleClick('TOP')} className='add-board-container board' />
      <div />
      <Popper
        className='.create-board-popper flex justify-center'
        id={id}
        style={{
          backgroundColor: '#ffff',
          width: '300px',
          height: '450px',
          borderRadius: '3px',
          boxShadow:
            '0 8px 16px -4px rgb(9 30 66 / 25%), 0 0 0 1px rgb(9 30 66 / 8%)',
        }}
        open={open}
        anchorEl={anchorEl}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={2}>
            <div className='create-board-container flex column'>
              <div className='create-board-header flex row'>
                <p>Create Board</p>
                <a href='#' onClick={(ev) => onHandleModal(ev)}>
                  ✕
                </a>
              </div>
              <div className='create-board-body flex column'>
                <div className='new-board-preview-container flex'>
                  <div style={preview} className='new-board-preview'>
                    <div className='selected-background'>
                      <img
                        className='selected-background-img'
                        src='https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg'
                      />
                    </div>
                  </div>
                </div>
                <div className='background-title'>
                  <p>Background</p>
                </div>
                <div className='background-picker-container flex'>
                  <div className='upper-row flex'>
                    <button className='btn-img-0'>
                      <img
                        onClick={(ev) => handleImgClick(ev)}
                        style={{
                          width: '60px',
                          height: '40',
                          backgroundSize: 'contain',
                        }}
                        className='background-img-0'
                      />
                    </button>
                    <button className='btn-img-1'>
                      <img
                        onClick={(ev) => handleImgClick(ev)}
                        style={{
                          width: '60px',
                          height: '40',
                          backgroundSize: 'contain',
                        }}
                        className='background-img-1'
                      />
                    </button>
                    <button className='btn-img-2'>
                      <img
                        onClick={(ev) => handleImgClick(ev)}
                        style={{
                          width: '60px',
                          height: '40',
                          backgroundSize: 'contain',
                        }}
                        className='background-img-2'
                      />
                    </button>
                    <button className='btn-img-3'>
                      <img
                        onClick={(ev) => handleImgClick(ev)}
                        style={{
                          width: '60px',
                          height: '40',
                          backgroundSize: 'contain',
                        }}
                        className='background-img-3'
                      />
                    </button>
                  </div>
                  <div className='lower-row flex'>
                    <div
                      onClick={() => handleColorClick('#0079bf')}
                      style={{ backgroundColor: '#0079bf' }}
                      className='background-color'
                    ></div>
                    <div
                      onClick={() => handleColorClick('#d29034')}
                      style={{ backgroundColor: '#d29034' }}
                      className='background-color'
                    ></div>
                    <div
                      onClick={() => handleColorClick('#519839')}
                      style={{ backgroundColor: '#519839' }}
                      className='background-color'
                    ></div>
                    <div
                      onClick={() => handleColorClick('#b04632')}
                      style={{ backgroundColor: '#b04632' }}
                      className='background-color'
                    ></div>
                    <div
                      onClick={() => handleColorClick('#89609e')}
                      style={{ backgroundColor: '#89609e' }}
                      className='background-color'
                    ></div>
                    <div
                      style={{ backgroundColor: '#f5f6f8' }}
                      className='background-color'
                    ></div>
                  </div>
                </div>
                <p className='board-title'>Board Title</p>
                <div className='input-container'>
                  <input
                    value={boardTitle}
                    onChange={onHandleChange}
                    type='text'
                  />
                </div>
                <div className='create-button-container flex justify-center'>
                  <button onClick={handleBoardSubmit} >Create</button>
                </div>
              </div>
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
};
