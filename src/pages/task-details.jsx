import * as React from 'react';
import Grid from '@mui/material/Grid';
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

// Move: import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
// copy: import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
// make template: import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
// Watch: import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
// Archive: import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
// Share: import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

export function ScrollDialog() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('body');

  const handleClickOpen = () => () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
      >
        <DialogTitle id='scroll-dialog-title'>Task Details</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id='scroll-dialog-description'
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Grid container sx={{ color: 'text.primary' }}>
              <Grid item  xs={4}>
                <Typography>Join</Typography>
                <PersonOutlineOutlinedIcon />
              </Grid>
              <Grid item xs={4}>
                <Typography>Members</Typography>
                <PersonOutlineOutlinedIcon />
              </Grid>
              <Grid item xs={4}>
                <Typography>Labels</Typography>
                <LocalOfferOutlinedIcon />
              </Grid>
              <Grid item xs={4}>
                <Typography>Checklist</Typography>
                <CheckBoxOutlinedIcon />
              </Grid>
              <Grid item xs={4}>
                <Typography>Dates</Typography>
                <QueryBuilderIcon />
              </Grid>
              <Grid item xs={4}>
                <Typography>Attachment</Typography>
                <AttachFileIcon />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
