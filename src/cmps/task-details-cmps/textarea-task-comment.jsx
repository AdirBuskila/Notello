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
  const [isAdding, onIsAdding] = useState(false);
  console.log('newComment', newComment);

  const groupIdx = boardService.getGroupIdxById(board, group._id);
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => {
    return currTask._id === task._id;
  });

  const onHandleModal = () => {
    console.log(newComment);
    onIsAdding(!isAdding);
  };

  const onCloseModal = () => {
    console.log(newComment);
    if (newComment !== '') return;
    onHandleModal();
  };

  const onHandleChange = ({ target }) => {
    const value = target.value;
    setNewComment(value);
    console.log(newComment);
  };

  const onAdd = async () => {
    const comment = {
      _id: utilService.makeId(),
      txt: newComment,
      createdAt: Date.now(),
      byMember: {
        _id: utilService.makeId(),
        fullname: 'Guest',
        imgUrl: '',
      },
    };
    const activity = {
      _id: utilService.makeId(),
      txt: `added comment to task (${task.title}) - ${comment.txt}`,
      createdAt: Date.now(),
      byMember: comment.byMember.fullname,
      task: {
        _id: task._id,
        title: task.title,
      },
    };
    try {
      board.activities.unshift(activity);
      board.groups[groupIdx].tasks[taskIdx].comments.push(comment);
      const action = { type: 'SET_BOARD', board };
      await dispatch(action);
    } catch (err) {
      console.log('Cannot add comment to task');
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
