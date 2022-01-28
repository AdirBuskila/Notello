import React, { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '@mui/material/Button';
import { boardService } from '../../services/board.service';
import { utilService } from '../../services/util.service';
import { useDispatch, useSelector} from 'react-redux';


export const EditDescription = (props) => {
  const { task, group, board, description, setEditMode } = props;
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);

  const [DescriptionTxt, setNewDescription] = useState(description);
  const [isEditing , onIsEditing] = useState(false);

  const groupIdx = boardService.getGroupIdxById(board, group._id);
  const taskIdx = board.groups[groupIdx].tasks.findIndex((currTask) => {
    return currTask._id === task._id;
  });

  const dispatch = useDispatch();

  const onHandleModal = () => {
    onIsEditing(!isEditing);
  };

  const onHandleChange = ({ target }) => {
    const value = target.value;
    setNewDescription(value);
  };

  const onAdd = async () => {
    const activity = {
      _id: utilService.makeId(),
      txt: `changed ${task.title} task description to - ${DescriptionTxt}`,
      createdAt: Date.now(),
      byMember: loggedInUser,
      task: {
        _id: task._id,
        title: task.title,
      },
    };
    try {
      board.activities.unshift(activity);
      board.groups[groupIdx].tasks[taskIdx].description = DescriptionTxt;
      const action = { type: 'SET_BOARD', board };
      dispatch(action);
      setEditMode(false)
    } catch (err) {
      console.log('Cannot add description to task');
    }
  };

  return (
    <React.Fragment>
 <div className='new-description flex column'>
        <textarea
          autoFocus
          onChange={onHandleChange}
          rows='4'
          defaultValue={DescriptionTxt}
        ></textarea>
        <div className='new-description-actions flex align-center'>
          <Button
            onClick={onAdd}
            variant='contained'
            sx={{ textTransform: 'none', minWidth: 52.5 }}
          >
            Save
          </Button>
          <a href='#' onClick={onHandleModal}>
            ✕
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};
