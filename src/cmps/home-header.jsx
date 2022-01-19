import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/img/notello-static-3.gif';

export const HomeHeader = () => {
  return (
    <section className='home-header'>
      <header className='flex space-between align-center'>
        <NavLink to='/' className='flex logo-img'>
          {/* <img className='logo-img' src={logo} /> */}
          {/* <div className='logo'> Notello </div> */}
        </NavLink>
        <nav className='nav-links clean-list flex align-center'>
          <NavLink to='/board'>Board</NavLink>
          <NavLink to='/login'>Login</NavLink>
        </nav>
      </header>
    </section>
  );
};
