import React from 'react';
import { Avatar } from '@mui/material';
import { utilService } from '../../services/util.service';

export const ActivityPerTask = (props) => {
  const { board, task } = props;
  return (
    <React.Fragment>
      {board.activities.map((activity, idx) => {
        return (
          <React.Fragment>
            {activity.task && activity.task._id === task._id && (
              <div className='flex comment' key={idx}>
                <div className='activity-individual flex'>
                  {activity.byMember && (
                    <Avatar
                      alt='G'
                      src={activity.byMember.imgUrl}
                      style={{
                        width: '32px',
                        height: '32px',
                        position: 'absolute',
                        left: '0.75rem',
                      }}
                    />
                  )}
                  <div className='flex column'>
                    <div className='activity-header flex wrap'>
                      <span>{activity.byMember.fullname}</span>
                      <p>{activity.txt}</p>
                    </div>
                    <span className='activity-date'>
                      {utilService.fixTimestamp(activity.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};
