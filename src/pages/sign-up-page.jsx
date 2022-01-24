import React from 'react';

import left from '../assets/img/left.svg';
import right from '../assets/img/right.svg';
import { MySignUp } from '../cmps/sign-up.jsx';
import logo from '../assets/img/notello-clear.png';
import { Link } from 'react-router-dom';

export const SignUp = () => {
  return (
    <div className='sign-up-container flex column align-center'>
      <Link className='clean-link' to='/'>
        <img src={logo} className='sign-up-logo' />
      </Link>
      <MySignUp />
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
