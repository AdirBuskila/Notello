import React from 'react';
import { useSelector } from 'react-redux';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { Avatar } from '@mui/material';

// import { Link } from 'react-router-dom';

// import { utilService } from '../services/util.service';
// import { boardService } from '../services/board.service';

export const BoardNotifications = (props) => {
  const board = useSelector((state) => state.boardModule.board);
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
  const className = props.notificationsOpen
    ? 'board-notification-container open'
    : 'board-notification-container';
  if (!board || board.length === 0) return <p>Loading...</p>;

  // const newAc = {...board.activities[6], wasShownTo: [{_id: '101307917284498468334', }]}
  // const noti = boardService.getNotificationMode(board ,newAc ,loggedInUser)
  // console.log('noti',noti);
  // console.log('loggedIn', loggedIn);
  return (
    // <section className='board-activity-container'>
    <section className={className}>
      <div className='notification-menu flex align-center'>
        <span>Menu</span>
        <ClearSharpIcon
          className='close-btn'
          onClick={() => {
            props.setNotificationsOpen(false);
          }}
        />
      </div>
      <hr />
      <div className='notification-header flex align-center'>
        <ChatOutlinedIcon className='notification-icon' />
        <span>Activity</span>
      </div>
      <article className='activities-container flex-column'>
        {board.activities ? (
          board.activities.map((activity) => {
            return (
              <React.Fragment key={activity._id}>
                <div
                  className='notification-preview-container flex'
                  key={activity._id}>
                  <div className='dot'></div>
                  <div className='notification-individual-container flex'>
                    <div className='notification-individual-header flex column'>
                      {/* ///////// STRING TO COLOR BACKGROUND */}

                      <div className='header-container'>
                        {/* /////////WHITE BACK GROUND */}

                        <div className='task-title'>
                          <p className='task-name'></p>
                        </div>
                      </div>
                      <div className='project-name-container'>
                        <p style={{ color: 'white' }} className='project-name'>
                          Notello:<span className='group-name'>SCSS</span>
                        </p>
                      </div>
                    </div>
                    <div className='notification-individual-body flex justify-center'>
                      <div className='body-content-container'>
                        <div className='user-container'>
                          <Avatar
                            alt='G'
                            src={activity.byMember.imgUrl}
                            style={{
                              width: '37px',
                              height: '37px',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    {/* {activity.byMember && (
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
                  </div> */}
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
