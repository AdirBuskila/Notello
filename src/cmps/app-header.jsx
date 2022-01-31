import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { WorkspacesHeaderModal } from '../cmps/workspaces-header-modal';
import { RecentHeaderModal } from '../cmps/recent-header-modal';
import { StarredHeaderModal } from './starred-header-modal';
import { TemplatesHeaderModal } from './templates-header-modal';
import { CreateHeaderModal } from './create-header-modal';
import { UserBadge } from './logged-in-user';
import { useEffect } from 'react';
import { boardService } from '../services/board.service';
import { BoardNotifications } from '../pages/board-notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { utilService } from '../services/util.service';

export const AppHeader = () => {
  const [boards, setBoards] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const boards = await boardService.query();
        setBoards(boards);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  if (!boards || boards.length === 0) return <p></p>;

  return (
    <header className='app-header flex align-center space-between'>
      <div className='links-container flex align-center'>
        <NavLink to='/' className='logo-img brdr-rds'></NavLink>
        <WorkspacesHeaderModal boards={boards} />
        <RecentHeaderModal />
        <StarredHeaderModal />
        <TemplatesHeaderModal />
        <CreateHeaderModal />
      </div>
      <div className='user-info-container'>
        <div
          onClick={() => {
            setNotificationsOpen(true);
          }}
          style={{ position: 'absolute', top: '10px', right: '60px' }}
          className='notification-icon'>
          <NotificationsNoneIcon color='white' />
        </div>
        <BoardNotifications
          notificationsOpen={notificationsOpen}
          setNotificationsOpen={setNotificationsOpen}
          key={utilService.makeId()}
        />
        <div className='logged-in-user'>
          <UserBadge />
        </div>
      </div>

      <nav className='nav-links clean-list flex align-center'></nav>
    </header>
  );
};
