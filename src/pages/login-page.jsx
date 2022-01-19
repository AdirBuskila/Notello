import React from 'react';
import left from '../assets/img/left.svg';
import right from '../assets/img/right.svg';
import { MyLogin } from '../cmps/login.jsx';
import logo from '../assets/img/notello-clear.png'


export class Login extends React.Component {
  render() {
    return (
      <div className='login-container flex column align-center'>
        <img src={logo} className='login-logo' />
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
  }
}
