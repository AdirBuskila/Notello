import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { utilService } from '../../services/util.service';
import { boardService } from '../../services/board.service';
import { saveBoard } from '../../store/actions/board.action';

export const AddCommentCmp = (props) => {
  const { task, group, board } = props;

  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);

  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState('');
  const [active, setActive] = useState('');
  // console.log('newComment', newComment);
  const groupIdx = boardService.getGroupIdxById(board, group._id);
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => {
    return currTask._id === task._id;
  });
  const onHandleChange = ({ target }) => {
    const value = target.value;
    setNewComment(value);
  };

  const onAdd = async (ev) => {
    if (ev.type === 'keydown') ev.preventDefault();
    const comment = {
      _id: utilService.makeId(),
      txt: newComment,
      createdAt: Date.now(),
      byMember: loggedInUser,
    };
    setNewComment('');
    const activity = boardService.addTaskActivity(
      `added comment to task ${task.title} - ${comment.txt}`,
      task._id,
      task.title,
      loggedInUser
    );
    try {
      if (activity) board.activities.unshift(activity);
      board.groups[groupIdx].tasks[taskIdx].comments.push(comment);
      // const action = { type: 'SET_BOARD', board };
      // await dispatch(action);
      await dispatch(saveBoard(board));
    } catch (err) {
      console.log('cannot add new comment', err);
    }
  };
  return (
    <React.Fragment>
      <div className='new-comment flex column'>
        <textarea
          onFocus={() => {
            setActive(true);
          }}
          onBlur={() => {
            setActive(false);
          }}
          value={newComment}
          onChange={onHandleChange}
          rows='2'
          // defaultValue={newComment}
          placeholder={`Write a comment... `}></textarea>
        {active && (
          <div className='new-comment-actions flex align-center'>
            <Button variant='contained' onMouseDown={onAdd}>
              Save
            </Button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
