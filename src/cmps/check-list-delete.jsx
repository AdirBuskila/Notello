import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import { saveBoard } from '../store/actions/board.action';
import { boardService } from '../services/board.service';

export const CheckListDelete = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const loggedInUser = useSelector((state) => state.userModule.loggedInUser)
    const dispatch = useDispatch();
    const { board, task, taskIdx, groupIdx, checklistIdx, checklist } = props;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setAnchorEl(null);
    };

    const onDelete = () => {
        const activity = boardService.addTaskActivity(`deleted checklist - ${checklist.title}`, task._id, task.title, loggedInUser)
        try {
            if (activity) board.activities.unshift(activity);
            task.checklists.splice(checklistIdx, 1);
            board.groups[groupIdx].tasks[taskIdx] = task;
            dispatch(saveBoard(board))
        } catch (err) {
            console.log(`Cant delete checklist`, err);
        }
        handleClose()
    }

    return (
        <div className='button-container flex'>
            <Typography onClick={handleClick}>
                <button className='flex end' onClick={handleClick}>Delete</button>
            </Typography>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                <Typography sx={{ p: 0.5, width: '304px', height: '148px', overflow: 'hidden' }}>
                    <div className='check-list-modal flex justify-center'>
                        <span>{'Deleting ' + checklist.title + ' ?'}</span>
                        <a onClick={handleClose}>
                            ✕
                        </a>
                    </div>
                    <div className='check-list-inner flex column'>
                        <div>
                            Deleting a checklist is permanent and there is no way to get it back.
                        </div>
                        <button style={{ backgroundColor: 'red', width: 'fit-content', margin: 'auto', marginTop: '10px' }} onClick={onDelete}>Delete checklist</button>
                    </div>
                </Typography>
            </Popover>
        </div>
    );
};
