import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { Avatar } from '@mui/material';

import { utilService } from '../services/util.service';



export const BoardActivity = (props) => {

    const {board} = props;
    console.log("board: ", board.activities);


    console.log('ACTIVITIES', props.board);
    if (!props.board || props.board.length === 0) return (<p>Loading...</p>)
    return (
        <section className='board-activity-container'>
            <div className='activity-menu flex align-center'>
                <span>Menu</span>
                <ClearSharpIcon className='close-btn' />
            </div>
                <hr />
                <div className='activity-header flex align-center'>
                <ChatOutlinedIcon className='activity-icon' />
                <span>Activity</span>
                </div>
                <article className='activities-container flex start column'>
                {board.activities.map((activity) => {
                    console.log("activity: ", activity);
                    <Avatar
                    alt='G'
                    src={activity.byMember.imgUrl}
                    style={{ width: '32px', height: '32px', border: '0', position:'absolute', right: '10px'}}
                  />
                })}
                </article>
        </section>
    )
}