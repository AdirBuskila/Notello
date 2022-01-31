import React from 'react';
import { useSelector } from 'react-redux';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
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
      <div className='activity-header-container'>
        <div className='activity-header flex align-center'>
          <FormatListBulletedIcon
            style={{ color: '#42526e' }}
            className='activity-icon'
          />
          <span>Activity</span>
        </div>
      </div>
      <article className='activities-container flex column'>
        {board.activities ? (
          board.activities.map((activity) => {
            return (
              <React.Fragment key={activity._id}>
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
                    <div className='activity-data'>
                      <span>{activity.byMember.fullname}</span>
                      <p>{activity.txt}</p>
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
                    <span className='activity-date'>
                      {utilService.fixTimestamp(activity.createdAt)}
                    </span>
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
