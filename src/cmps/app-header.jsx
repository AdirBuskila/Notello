import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/img/notello-logo-static.png';

export const AppHeader = () => {
  return (
    <section className='home-header'>
      <header className='flex space-between align-center'>
        <NavLink to='/' className='flex'>
          <img className='logo-img' src={logo} />
          <div className='logo'> Notellox </div>
        </NavLink>
        <nav className='nav-links clean-list flex align-center'>
          <NavLink to='/board'>Board</NavLink>
        </nav>
      </header>
    </section>
  );
};
