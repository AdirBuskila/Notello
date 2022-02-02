import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import ADD_MEMBER from '../assets/img/add-user.png';
import Button from '@mui/material/Button';



export const CopyLinkPopper = () => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
    HandleCopyLink(event)
    setTimeout(handleClose ,1700)
  };

  const handleClose = ()=> {
      setOpen(false)
  }

  const HandleCopyLink = (ev) => {
    console.log('ev', ev.view);
    const copyLink = ev.view.location.href
    navigator.clipboard.writeText(copyLink);
    console.log(copyLink);
}

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  return (
    <div>
      <Button
        onClick={handleClick}
        className='new-member flex'
        variant='contained'
      >
        <img
          src={ADD_MEMBER}
          alt='invite'
          style={{ width: '12px', height: '12px' }}
        />
        <a>Invite</a>
      </Button>
      <Popper className='copy-link-popper' id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={2}>
            <Box sx={{ mt:'8px',borderRadius:'8px',border: 1, p: 1, bgcolor: 'background.paper' }}>
              Link Copied to Clipboard!
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
