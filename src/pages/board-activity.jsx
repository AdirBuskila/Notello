import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { Avatar } from '@mui/material';

import { Link } from 'react-router-dom';

import { utilService } from '../services/util.service';

export const BoardActivity = (props) => {
  const board = useSelector((state) => state.boardModule.board);

  if (!board || board.length === 0) return <p>Loading...</p>;
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
      <article className='activities-container flex column'>
        {board.activities ? (
          board.activities.map((activity) => {
            return (
              <React.Fragment>
                <div className='flex'>
                  <div className='activity-individual flex'>
                   {activity.byMember && <Avatar
                       alt='G'
                       src={activity.byMember.imgUrl}
                       style={{
                         width: '32px',
                         height: '32px',
                       }}
                     />}
                    <div className='flex column'>
                        <div className='flex column wrap'>
                        <span>{activity.byMember.fullname}</span>
                        <p>{activity.txt}</p>
                        </div>
                    <span>{utilService.fixTimestamp(activity.createdAt)}</span>
                      {console.log(activity.task._id)}
                      {console.log(activity.task._id)}
                    {(activity.task) ? 
                    <Link to={`/b/${board._id}/${activity.task._id}`}>
                      {!activity.txt.includes('deleted') && <q>{activity.task.title}</q>}
                    </Link> : null}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <p>This board has no activities.</p>
        )}
      </article>
    </section>
  );
};