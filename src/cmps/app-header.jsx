import React from 'react';
import { NavLink } from 'react-router-dom';
import BoardsMenu from './boards-menu';

export const AppHeader = () => {
  return (
      <header className='app-header flex align-center'>
        <NavLink to='/' className='flex logo-img'></NavLink>
        <BoardsMenu/>
        <nav className='nav-links clean-list flex align-center'>
        </nav>
      </header>
  );
};
