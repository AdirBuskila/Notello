import React from 'react';
import { NavLink } from 'react-router-dom';

export const HomeHeader = () => {
  return (
    <section className='home-header'>
      <header className='flex space-between align-center'>
        <NavLink to='/' className='flex logo-img'></NavLink>
        <nav className='nav-links clean-list flex align-center'>
          <NavLink to='/board'>Board</NavLink>
          <NavLink to='/login'>Login</NavLink>
        </nav>
      </header>
    </section>
  );
};