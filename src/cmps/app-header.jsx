import { NavLink } from 'react-router-dom';
import logo from '../assets/img/notello-logo-static.png';

export const AppHeader = () => {
  return (
    <section className='app-header'>
      <header className='flex space-around align-center'>
        <NavLink to='/'>
          <img className='logo-img' src={logo} />
          <div className='logo'> Notello </div>
        </NavLink>
        <nav className='nav-links clean-list flex align-center'>
          <NavLink to='/board'>Board</NavLink>
          {/* <NavLink to='/toy'>MisterToy</NavLink>| */}
          {/* <NavLink to='/about'>About</NavLink> */}
        </nav>
      </header>
    </section>
  );
};
