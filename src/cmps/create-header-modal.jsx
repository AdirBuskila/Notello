import * as React from 'react';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { useSelector } from 'react-redux';
import { boardService } from '../services/board.service';
import { Button } from '@mui/material';

export const CreateHeaderModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [placement, setPlacement] = React.useState();
  const [preview, setPreview] = React.useState(
    'https://res.cloudinary.com/dubjerksn/image/upload/v1643708669/fd0r56qqxrphaea8g7k3.png'
  );
  const [boardTitle, setBoardTitle] = React.useState('');
  const [boardStyle, setBoardStyle] = React.useState('');
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);

  const handleBoardSubmit = () => {
    // const { setNewBoard } = props;

    if (!boardTitle) return;
    const board = {
      title: boardTitle,
      createdAt: Date.now(),
      createdBy: loggedInUser,
      style: boardStyle,
      isStarred: false,
    };
    boardService.save(board);
    setPreview(
      'https://res.cloudinary.com/dubjerksn/image/upload/v1643708669/fd0r56qqxrphaea8g7k3.png'
    );
    setBoardTitle('');
    // setNewBoard(false);
    setOpen(false);
  };

  const onHandleChange = ({ target }) => {
    const value = target.value;
    setBoardTitle(value);
  };

  const handleClick = (newPlacement) => (event) => {
    // props.setNewBoard(true)
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  const onHandleModal = (ev) => {
    ev.preventDefault();
    setOpen(false);
  };

  const handleImgClick = (ev) => {
    const newPreview = `${ev.target.currentSrc}`;
    setPreview(newPreview);
    setBoardStyle({ imgUrl: `${ev.target.currentSrc}` });
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <div
      onBlur={() => {
        setOpen(false);
      }}
    >
      <Button
        sx={{ width: '10px' }}
        className='header-board add-header'
        onClick={handleClick('bottom')}
      >
        <span>Create</span>
      </Button>
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
                  <div className='new-board-preview'>
                    <div className='selected-background'>
                      <img src={preview} />
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
                        src='https://res.cloudinary.com/dubjerksn/image/upload/v1644703506/b0tj6zwxbfshuojdyim7.jpg'
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
                        src='https://res.cloudinary.com/dubjerksn/image/upload/v1644703505/uzyztm6omrhksxpbtt80.jpg'
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
                        src='https://res.cloudinary.com/dubjerksn/image/upload/v1644703518/qogwddfqkwhxvsbjm34q.jpg'
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
                        src='https://res.cloudinary.com/dubjerksn/image/upload/v1644703631/jirzrw54bnq8eg7cpfpo.jpg'
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
                      onClick={(ev) => handleImgClick(ev)}
                      className='background-color'
                    >
                      <img src='https://res.cloudinary.com/dubjerksn/image/upload/v1644705588/xaussj5qb0xunt82nggr.png' />
                    </div>
                    <div
                      onClick={(ev) => handleImgClick(ev)}
                      className='background-color'
                    >
                      <img src='https://res.cloudinary.com/dubjerksn/image/upload/v1644705587/sb2n9r1ouagefrnqa7vb.png' />
                    </div>
                    <div
                      onClick={(ev) => handleImgClick(ev)}
                      className='background-color'
                    >
                      <img src='https://res.cloudinary.com/dubjerksn/image/upload/v1644705587/lljyplmcjjydimv29ph4.png' />
                    </div>
                    <div
                      onClick={(ev) => handleImgClick(ev)}
                      className='background-color'
                    >
                      <img src='https://res.cloudinary.com/dubjerksn/image/upload/v1644705587/ltc8ebckr7yegf3jzgax.png' />
                    </div>
                    <div
                      onClick={(ev) => handleImgClick(ev)}
                      className='background-color'
                    >
                      <img src='https://res.cloudinary.com/dubjerksn/image/upload/v1644705587/ijpikorqm2mw0ni99tf3.png' />
                    </div>
                    <div
                      onClick={(ev) => handleImgClick(ev)}
                      className='background-color'
                    >
                      <img src='https://res.cloudinary.com/dubjerksn/image/upload/v1644706132/vyrrzortjvwwdrrqxxti.png' />
                    </div>
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
                  <button onClick={handleBoardSubmit}>Create</button>
                </div>
              </div>
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
};
