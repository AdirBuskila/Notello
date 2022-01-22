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
import AddIcon from '@mui/icons-material/Add';
import { utilService } from '../services/util.service';

export function ScrollDialog(props) {
  const [scroll, setScroll] = React.useState('body');
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const { openPopup, setOpenPopup, title, children, members, labels } = props;

  console.log('members', members);
  console.log('title', title);
  console.log('labels', labels);
  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={openPopup}
      scroll={scroll}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      <div className='window-header flex space-between'>
        <DialogTitle id='scroll-dialog-title'>
          <div className='task-title flex justify-center'>
            <WebAssetIcon sx={{ marginTop: 0.5 }} />
            <p>{title}</p>
          </div>
        </DialogTitle>
        <div className='close-button flex align-center'>
          <CloseIcon
            onClick={() => {
              setOpenPopup(false);
            }}
          />
        </div>
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
            // ref={descriptionElementRef}
            tabIndex={-1}
          ></DialogContentText>
          <div className='buttons-container'>
            <p className='task-actions'>Suggested</p>
            <div className='button-container flex'>
              <PersonOutlineOutlinedIcon color='action' />
              <Typography>Join</Typography>
            </div>
            <p className='task-actions'>Add to card</p>
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
            <p className='task-actions'>Actions</p>
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
            <div className='task-info flex align-center'>
              <div className='labels-info-container'>
                <div className='span-container'>
                  <span>Labels</span>
                </div>
                <div className='labels-container align-center flex'>
                  {props.labels && (
                    <section className='flex'>
                      {props.labels.map((label) => {
                        return (
                          <div
                            key={utilService.makeId()}
                            style={{ backgroundColor: `${label.bgc}` }}
                            className='label-container flex justify-center align-center'
                          >
                            <p>{label.name}</p>
                          </div>
                        );
                      })}
                      <div
                        key={utilService.makeId()}
                        className='add-square-icon flex align-center justify-center'
                      >
                        <AddIcon key={utilService.makeId()} />
                      </div>
                    </section>
                  )}
                </div>
              </div>
              <div className='members-info-container'>
                <div className='span-container'>
                  <span>Members</span>
                </div>
                <div className='members-avatar-container flex'>
                  {props.members && (
                    <section className='flex' >
                      {props.members.map((member) => {
                        return (
                          <Avatar
                            key={member._id}
                            sx={{
                              bgcolor: deepPurple[500],
                              width: 30,
                              height: 30,
                              marginInlineEnd: 1,
                            }}
                          >
                            <p>{member.fullname.slice(0, 1)}</p>
                          </Avatar>
                        );
                      })}{' '}
                      <div className='add-icon flex align-center justify-center'>
                        <AddIcon key={utilService.makeId()} />
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
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
                  sx={{
                    bgcolor: deepPurple[500],
                    width: 25,
                    height: 25,
                    marginInlineEnd: 1,
                  }}
                >
                  <p>NC</p>
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
  );
}

// React.useEffect(() => {
//   setOpen(true);
// }, []);
