import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { utilService } from '../../services/util.service';
import { boardService } from '../../services/board.service';
import { useSelector} from 'react-redux';

export const AddCommentCmp = (props) => {
  const {task, group, board,} = props

  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);

  
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState('');
  const [active, setActive] = useState('');
  console.log('newComment', newComment);

  const groupIdx = boardService.getGroupIdxById(board, group._id);
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => {
    return currTask._id === task._id;
  });

  const onHandleChange = ({ target }) => {
    const value = target.value;
    setNewComment(value);
  };

  const onAdd = async () => {
    const comment = {
      _id: utilService.makeId(),
      txt: newComment,
      createdAt: Date.now(),
      byMember: {loggedInUser},
    };
    setNewComment('');
    // console.log('newComment', newComment);
    try {
      board.groups[groupIdx].tasks[taskIdx].comments.push(comment);
      const action = { type: 'SET_BOARD', board };
      await dispatch(action);
    } catch (err) {
      console.log('cannot add new comment', err);
    }
  };

  return (
    <React.Fragment>
      <div className='new-comment flex column'>
        <textarea
          style={{ resize: 'none', width: '94%' }}
          onFocus={() => {
            setActive(true);
          }}
          onBlur={() => {
            setActive(false);
          }}
          onChange={onHandleChange}
          rows='2'
          // defaultValue={newComment}
          placeholder={`Add a more detailed comment `}></textarea>
        {active && (
          <div className='new-comment-actions flex align-center'>
            <Button variant='contained' onClick={onAdd}>
              Save
            </Button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
