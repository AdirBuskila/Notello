import React, {useState} from 'react';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const GroupActionsModal = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const {board, groupIdx} = props;

  const handleClick = newPlacement => event => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const onHandleModal = ev => {
    ev.preventDefault();
    setOpen(false);
  };

  const onDelete = () => {
    //     try {
    //         board = board.groups.splice(groupIdx,1)[0]
    //         dispatch(saveBoard(board))
    // } catch (err) {
    //     console.log(`Cant delete board`, err);
    // }
    setOpen(false);
  };

  return (
    <div
      onBlur={() => {
        setOpen(false);
      }}>
      <MoreHorizIcon
        onClick={handleClick('right-end')}
        style={{fill: '#6b778c'}}
      />
      <Popper
        className='popper'
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition>
        {({TransitionProps}) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <div
                className='workspace-dropdown header-dropdown flex column align-center'
                style={{height: '200px'}}>
                <div className='workspace-modal-title drop-down-title  flex'>
                  List Actions
                  <a href='#' onClick={ev => onHandleModal(ev)}>
                    ✕
                  </a>
                </div>
                <div className='span-container'>
                  <p onClick={onDelete}>Delete</p>
                </div>
              </div>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
};
