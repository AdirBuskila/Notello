import * as React from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CallToActionOutlinedIcon from '@mui/icons-material/CallToActionOutlined';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import NotesIcon from '@mui/icons-material/Notes';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

// make template: import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
// Watch: import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
// Share: import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

export function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('body');
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(true);
  }, []);

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Button onClick={handleClickOpen()}>Open</Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <div className='window-header flex space-between'>
          <DialogTitle id='scroll-dialog-title'>
            <div className='card-title flex justify-center'>
              <WebAssetIcon sx={{ marginTop: 0.5 }} />
              <p>Task Details</p>
            </div>
          </DialogTitle>
          <CloseIcon onClick={handleClose} sx={{ m: 2 }} />
        </div>

        <div className='window-main-content'>
          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
            }}
            dividers={scroll === 'paper'}
          >
            <DialogContentText
              id='scroll-dialog-description'
              ref={descriptionElementRef}
              tabIndex={-1}
            ></DialogContentText>
            <div className='buttons-container'>
              <p className='card-actions'>Suggested</p>
              <div className='button-container flex  '>
                <PersonOutlineOutlinedIcon color='action' />
                <Typography>Join</Typography>
              </div>
              <p className='card-actions'>Add to card</p>
              <div className='button-container flex'>
                <PersonOutlineOutlinedIcon color='action' />
                <Typography>Members</Typography>
              </div>
              <div className='button-container flex'>
                <LocalOfferOutlinedIcon color='action' />
                <Typography>Labels</Typography>
              </div>
              <div className='button-container flex'>
                <CheckBoxOutlinedIcon color='action' />
                <Typography>Checklist</Typography>
              </div>
              <div className='button-container flex'>
                <QueryBuilderIcon color='action' />
                <Typography>Dates</Typography>
              </div>
              <div className='button-container flex'>
                <AttachFileIcon color='action' />
                <Typography>Attachment</Typography>
              </div>
              <p>Actions</p>
              <div className='button-container flex'>
                <ArrowForwardOutlinedIcon color='action' />
                <Typography>Move</Typography>
              </div>
              <div className='button-container flex'>
                <ContentCopyOutlinedIcon color='action' />
                <Typography>Copy</Typography>
              </div>
              <div className='button-container flex'>
                <Inventory2OutlinedIcon color='action' />
                <Typography>Archive</Typography>
              </div>
            </div>
            <div className='main-content'>
              <div className='description-container'>
                <div className='description flex'>
                  <NotesIcon />
                  <p>Description</p>
                </div>
                <textarea
                  sx={{ bgcolor: '#091e420a' }}
                  placeholder='Add a more detailed description...'
                ></textarea>
              </div>
              <div className='activity-container'>
                <div className='activity flex'>
                  <FormatListBulletedIcon />
                  <p>Activity</p>
                </div>
                <div className='comment-container flex'>
                  <Avatar
                    sx={{ bgcolor: deepPurple[500], height: 30, width: 30 }}
                  >
                    NC
                  </Avatar>
                  <textarea
                    sx={{ bgcolor: 'fff' }}
                    placeholder='Write a comment...'
                  ></textarea>
                </div>
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
