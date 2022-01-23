import React from 'react';
import { NavLink } from 'react-router-dom';
import BoardsMenu from './boards-menu';
import ArrowDown from '../assets/img/white-arrow-down.png';
import { WorkspacesHeaderModal } from '../cmps/workspaces-header-modal';
import { RecentHeaderModal } from '../cmps/recent-header-modal';
import { StarredHeaderModal } from './starred-header-modal';
import { TemplatesHeaderModal } from './templates-header-modal';
import { CreateHeaderModal } from './create-header-modal';

export const AppHeader = () => {
  return (
    <header className='app-header flex align-center'>
      <div className='logo-container flex align-center '>
        <NavLink to='/' className='logo-img brdr-rds'></NavLink>
      </div>
      <WorkspacesHeaderModal />
      <RecentHeaderModal />
      <StarredHeaderModal />
      <TemplatesHeaderModal />
      <CreateHeaderModal />
      <nav className='nav-links clean-list flex align-center'></nav>
    </header>
  );
};
