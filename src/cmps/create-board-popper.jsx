import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import ADD_MEMBER from '../assets/img/add-user.png';
import Button from '@mui/material/Button';
import axios from 'axios';

export const CreateBoardPopper = () => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [placement, setPlacement] = React.useState();
  const [preview, setPreview] = React.useState({background: 'black'})

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
    getPhotosForLoad()
  };
  const onHandleModal = (ev) => {
    ev.preventDefault();
    setOpen(false);
  };
  const getPhotosForLoad = async () => {
      try{
        const photos = await axios.get('https://api.unsplash.com/search/photos?query=wide&client_id=qUk-G2PG9c7CPbC3iLZO7d7ndV_Ltk0BjU1IwkBNS7k')
        changeDivBackground(photos.data.results)

        } catch (err ) {
            console.log('cannot load photos ',err);
        }
  }

  const changeDivBackground = (photos) => {
      console.log(photos);
        photos.map((photo,index)=>{
            if (index > 3) return
            console.log('photo.urls.small', photo.urls.small);
            const div = document.getElementsByClassName(`background-img${index}`)[0]
            // const btn = document.getElementsByClassName(`btn-img${index}`)[0]
            div.src=`${photo.urls.thumb}`
            // btn.on =('click',setPreview(`${photo.urls.thumb}`)) 
        })
  }

//   const setPreviewDiv = (url) => {
//       const preview = document.getElementsByClassName('new-board-preview-img')
//       preview.style.background =`url(${url})`
//   } 

const handleImgClick = (ev) => {
    console.log('ev', ev)
    const newPreview = {background: `url(${ev.target.currentSrc})`}
    setPreview(newPreview)
}


  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <div>
      <div
        onClick={handleClick('TOP')}
        className='add-board-container board'
      />
      <div />
      <Popper
        className='.create-board-popper'
        id={id}
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
                  <div className="new-board-preview-container flex">
                <div style={preview} className='new-board-preview'>
                  <div className='selected-background'>
                      
                      <img className='selected-background-img' src='https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg' />

                      </div>
                </div>
                  </div>
                <div className='background-picker-container flex'>
                  <p>Background</p>
                  <div className='upper-row'>
                      <button className='btn-img0'>
                    <img onClick={(ev)=> handleImgClick(ev)} style={{width: '64px'}} className='background-img0'/>
                      </button>
                      <button className='btn-img1'>
                    <img onClick={(ev)=> handleImgClick(ev)} style={{width: '64px'}} className='background-img1'/>
                      </button>
                      <button className='btn-img2'>
                    <img onClick={(ev)=> handleImgClick(ev)} style={{width: '64px'}} className='background-img2'/>
                      </button>
                      <button className='btn-img3'>
                    <img onClick={(ev)=> handleImgClick(ev)} style={{width: '64px'}} className='background-img3'/>
                      </button>
                  </div>
                  <div className='lower-row'>
                    <div className='background-color'></div>
                    <div className='background-color'></div>
                    <div className='background-color'></div>
                    <div className='background-color'></div>
                    <div className='background-color'></div>
                    <div className='background-color'></div>
                  </div>
                </div>
                <div className="input-container">
                <p>Board Title</p>
                    <input type="text"  />
                </div>
              </div>
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
};
