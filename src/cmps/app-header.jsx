import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { WorkspacesHeaderModal } from '../cmps/workspaces-header-modal';
import { RecentHeaderModal } from '../cmps/recent-header-modal';
import { StarredHeaderModal } from './starred-header-modal';
import { TemplatesHeaderModal } from './templates-header-modal';
import { CreateHeaderModal } from './create-header-modal';
import Avatar from '@mui/material/Avatar';
import {UserBadge} from './logged-in-user';


export const AppHeader = () => {

  
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

      <div className="logged-in-user">
      <UserBadge/>
      </div>

      <nav className='nav-links clean-list flex align-center'></nav>
    </header>
  );
};
