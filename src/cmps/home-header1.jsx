import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/img/notello-clear.png';
import Button from '@mui/material/Button';

export const HomeHeader1 = () => {
  return (
    <section className='home-header1'>
      <header className='flex space-between align-center'>
        <NavLink to='/' className='flex'>
          <img className='logo-img1' src={logo} alt='logo.png' />
        </NavLink>
        <nav className='nav-links clean-list flex align-center'>
          <NavLink to='/login'>
            <Button
             variant="text"
            >Log in</Button>
          </NavLink>
          <NavLink to='/signup'>
            <Button
             variant="contained"
            >Sign Up</Button>
          </NavLink>
        </nav>
      </header>
    </section>
  );
};
