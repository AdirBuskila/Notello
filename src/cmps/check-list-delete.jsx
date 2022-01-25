import React, { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { boardService } from '../services/board.service';


export const CheckListDelete = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { board, task, taskIdx, groupIdx, checklistIdx, checkList } = props;
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setAnchorEl(null);
    };

    const onDelete = () => {
        task.checklists.splice(checklistIdx, 1);
        board.groups[groupIdx].tasks[taskIdx] = task;
        boardService.saveBoard(board);
        const action = { type: 'SET_BOARD', board };
        dispatch(action);
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
                        <span>{'Deleting ' + checkList.title + ' ?'}</span>
                        <a href='#' onClick={handleClose}>
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
