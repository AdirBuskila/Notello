import { NavLink } from 'react-router-dom';

export const AppHeader = () => {
  return (
    <section className='app-header'>
      <header className=' flex space-between align-center'>
        <NavLink to='/'>
          <div className='logo'> Notello </div>{' '}
        </NavLink>
        <nav className='nav-links clean-list flex align-center'>
          {' '}
          {/* <NavLink to='/login'>Login</NavLink> | */}{' '}
          {/* <NavLink to='/toy'>MisterToy</NavLink>| */}{' '}
          {/* <NavLink to='/about'>About</NavLink> */}{' '}
        </nav>{' '}
      </header>{' '}
    </section>
  );
};
