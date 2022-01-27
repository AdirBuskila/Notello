import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { WorkspacesHeaderModal } from '../cmps/workspaces-header-modal';
import { RecentHeaderModal } from '../cmps/recent-header-modal';
import { StarredHeaderModal } from './starred-header-modal';
import { TemplatesHeaderModal } from './templates-header-modal';
import { CreateHeaderModal } from './create-header-modal';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@mui/material/Avatar';

export const AppHeader = () => {
  const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
  return (
    <header className='app-header flex align-center space-between'>
      <div className="links-container flex align-center">
      <NavLink to='/' className='logo-img brdr-rds'></NavLink>
      <WorkspacesHeaderModal />
      <RecentHeaderModal />
      <StarredHeaderModal />
      <TemplatesHeaderModal />
      <CreateHeaderModal />
      </div>
      <Avatar
        alt='NG'
        src={loggedInUser.imgUrl}
        style={{ width: '32px', height: '32px', border: '0', position:'absolute', right: '10px'}}
      />
      <nav className='nav-links clean-list flex align-center'></nav>
    </header>
  );
};
