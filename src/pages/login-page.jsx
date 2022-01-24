import React from 'react';
import left from '../assets/img/left.svg';
import right from '../assets/img/right.svg';
import { MyLogin } from '../cmps/login.jsx';
import logo from '../assets/img/notello-clear.png';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div className='login-container flex column align-center'>
      <Link className='clean-link' to='/'>
        <img src={logo} className='login-logo' />
      </Link>
      <MyLogin />
      <div className='imgs-container flex row'>
        <div className='svg-container'>
          <img src={left} className='left' alt='logo' />
        </div>
        <div className='svg-container'>
          <img src={right} className='right' alt='logo' />
        </div>
      </div>
    </div>
  );
};
