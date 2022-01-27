import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { utilService } from '../../services/util.service';
import { boardService } from '../../services/board.service';
<<<<<<< HEAD

export const AddCommentCmp = (props) => {
  const { task, group, board } = props;

=======
import { useSelector} from 'react-redux';

export const AddCommentCmp = (props) => {
  const {task, group, board,} = props

  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);

  
>>>>>>> 04034caa174fee12f54f10b030050d02249b23de
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState('');
  const [active, setActive] = useState('');
  console.log('newComment', newComment);

  const groupIdx = boardService.getGroupIdxById(board, group._id);
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => {
    return currTask._id === task._id;
  });
<<<<<<< HEAD

  const onHandleModal = () => {
    console.log(newComment);
    onIsAdding(!isAdding);
  };

  const onCloseModal = () => {
    console.log(newComment);
    if (newComment !== '') return;
    onHandleModal();
  };
=======
>>>>>>> 04034caa174fee12f54f10b030050d02249b23de

  const onHandleChange = ({ target }) => {
    const value = target.value;
    setNewComment(value);
<<<<<<< HEAD
    console.log(newComment);
=======
>>>>>>> 04034caa174fee12f54f10b030050d02249b23de
  };

  const onAdd = async () => {
    const comment = {
      _id: utilService.makeId(),
      txt: newComment,
      createdAt: Date.now(),
<<<<<<< HEAD
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
=======
      byMember: {loggedInUser},
    };
    setNewComment('');
    // console.log('newComment', newComment);
    try {
>>>>>>> 04034caa174fee12f54f10b030050d02249b23de
      board.groups[groupIdx].tasks[taskIdx].comments.push(comment);
      const action = { type: 'SET_BOARD', board };
      await dispatch(action);
    } catch (err) {
<<<<<<< HEAD
      console.log('Cannot add comment to task');
=======
      console.log('cannot add new comment', err);
>>>>>>> 04034caa174fee12f54f10b030050d02249b23de
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
<<<<<<< HEAD
            <Button
              onClick={() => {
                onAdd();
              }}
              variant='contained'>
=======
            <Button variant='contained' onClick={onAdd}>
>>>>>>> 04034caa174fee12f54f10b030050d02249b23de
              Save
            </Button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
