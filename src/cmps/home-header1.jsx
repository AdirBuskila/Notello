import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/img/notello-clear.png'

export const HomeHeader1 = () => {
  return (
    <section className='home-header1'>
      <header className='flex space-between align-center'>
        <NavLink to='/' className='flex'>
            <img className='logo-img1' src={logo} alt='logo.png' />
        </NavLink>
        <nav className='nav-links clean-list flex align-center'>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/signup'>Sign Up</NavLink>  
        </nav>
      </header>
    </section>
  );
};
