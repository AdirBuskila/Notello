import React from 'react';
import { NavLink } from 'react-router-dom';

export const AppHeader = () => {
  return (
    <section className='app-header'>
      <header className='flex space-between align-center'>
        <NavLink to='/' className='flex logo-img'></NavLink>
        <nav className='nav-links clean-list flex align-center'>
          <NavLink to='/board'>Board</NavLink>
        </nav>
      </header>
    </section>
  );
};
