import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';

import { utilService } from '../../services/util.service';

export const ActivityPerTask = (props) => {
  const { task } = props;
  const board = useSelector((state) => state.boardModule.board);
  return (
    <React.Fragment>
      {board.activities.map((activity, idx) => {
        return (
          <React.Fragment>
            {activity.task && activity.task._id === task._id && (
              <div className='flex comment' key={idx}>
                <div className='activity-individual flex' key={task._id}>
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
