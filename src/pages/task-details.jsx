import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import NotesIcon from '@mui/icons-material/Notes';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { deepOrange } from '@mui/material/colors';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

import { LabelsCmp } from '../cmps/labels-cmp';
import { MembersCmp } from '../cmps/members-cmp';
import { Textarea } from '../cmps/textarea-task-description';
import { Textarea1 } from '../cmps/textarea-task-comment';
import { CheckListModal } from '../cmps/check-list-modal'; 
import { Comments } from '../cmps/comments';

export function ScrollDialog(props) {
  const [scroll, setScroll] = React.useState('body');
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');

  const { openPopup, setOpenPopup, task } = props;
  const { labels,members,title, comments } = task

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
    className='task-details-dialog'
    PaperProps={{
      style: {
        backgroundColor:'#f4f5f7',
      },
    }}
    maxWidth={maxWidth}
      fullWidth={fullWidth}
      open={openPopup}
      scroll={scroll}
      aria-labelledby='task-details'
      aria-describedby='task-details-description'
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
              <CheckListModal/>
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
                  {props.labels && <LabelsCmp labels={props.labels} />}
                  {props.members && <MembersCmp members={props.members} />}
            </div>
            <div className='description-container'>
              <div className='description flex'>
                <NotesIcon />
                <p>Description</p>
              </div>
              <div className="add-description-container">
              <Textarea/>
              </div>
            </div>
            <div className='activity-container'>
              <div className='activity flex'>
                <FormatListBulletedIcon />
                <p>Activity</p>
              </div>
              <div className='comment-container flex'>
                <Avatar
                  sx={{
                    bgcolor: deepOrange[500],
                    width: 32,
                    height: 32,
                    marginInlineEnd: 1,
                  }}
                >
                  <p>NC</p>
                </Avatar>
                  <Textarea1 />
                  {/* {props.comments && <Comments comments={props.comments} />} */}
              
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}
