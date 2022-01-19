import React from 'react';
import left from '../assets/img/left.svg';
import right from '../assets/img/right.svg';
import { MySignUp } from '../cmps/sign-up.jsx';
import logo from '../assets/img/notello-clear.png'
       


export class SignUp extends React.Component {
  render() {
    return (
      <div className='sign-up-container flex column align-center'>
      <img src={logo} className='sign-up-logo' />  
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
  }
}
