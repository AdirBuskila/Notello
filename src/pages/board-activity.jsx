import React from 'react';
import { useSelector } from 'react-redux';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { Avatar } from '@mui/material';

import { Link } from 'react-router-dom';

import { utilService } from '../services/util.service';

export const BoardActivity = (props) => {
  const board = useSelector((state) => state.boardModule.board);
  const className = props.menuOpen
    ? 'board-activity-container open'
    : 'board-activity-container';

  if (!board || board.length === 0) return <p>Loading...</p>;
  return (
    // <section className='board-activity-container'>
    <section className={className}>
      <div className='activity-menu flex align-center'>
        <span>Menu</span>
        <ClearSharpIcon
          className='close-btn'
          onClick={() => {
            props.setMenuOpen(false);
          }}
        />
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
                    {activity.byMember && (
                      <Avatar
                        alt='G'
                        src={activity.byMember.imgUrl}
                        style={{
                          width: '32px',
                          height: '32px',
                        }}
                      />
                    )}
                    <div className='flex column'>
                      <div className='flex column wrap'>
                        <span>{activity.byMember.fullname}</span>
                        <p>{activity.txt}</p>
                      </div>
                      <span>
                        {utilService.fixTimestamp(activity.createdAt)}
                      </span>
                      {activity.task && (
                        <Link
                          onClick={() => {
                            props.setMenuOpen(false);
                          }}
                          to={`/b/${board._id}/${activity.task._id}`}>
                          {!activity.txt.includes('deleted') && (
                            <q>{activity.task.title}</q>
                          )}
                        </Link>
                      )}
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
