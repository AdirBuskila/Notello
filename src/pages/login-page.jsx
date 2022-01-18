import React from 'react';
import left from '../assets/img/left.svg';
import right from '../assets/img/right.svg';
import { MyLogin } from '../cmps/login.jsx';
import { MySignUp } from '../cmps/sign-up.jsx';
export class Login extends React.Component {

  state = {
    signUp: false
  }

  onChangeState = (bol) =>{
    this.setState({signUp: bol})
  }

  render() {
    const {signUp} = this.state
  return (
    <div className='login-container flex column align-center'>
      <h1>Welcome To The Login</h1>
      {!signUp && <MyLogin onChangeState={this.onChangeState} / >}
      {signUp && <MySignUp onChangeState={this.onChangeState} / >}
      <div className="imgs-container flex row">
      <div className='svg-container'>
        <img src={left} className='left' alt='logo' />
      </div>
      <div className='svg-container'>
        <img src={right} className='right' alt='logo' />
      </div>
      </div>
    </div>
  )}
};
