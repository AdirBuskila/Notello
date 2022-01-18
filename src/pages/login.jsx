import left from '../assets/img/left.svg';
import right from '../assets/img/right.svg';

export const Login = () => {
  return (
    <div className='login-container flex column align-center'>
      <h1>Welcome To The Login</h1>
      <div className="imgs-container flex row">
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
