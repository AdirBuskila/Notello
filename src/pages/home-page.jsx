import { HomeHeader } from '../cmps/home-header';
import { HomeHeader1 } from '../cmps/home-header1';
import { Link } from 'react-router-dom';
import hero from '../assets/img/hero.png';
import hero2 from '../assets/img/board.png';

export const HomePage = () => {
  return (
    <div className='home-container flex column align-center'>
      <HomeHeader1 />
      <h3> Welcome To The Home Page</h3>
      <div className='hero-container flex '>
        <img className='hero-img' src={hero} />
        <div className='home-txt'>
          <h1>Notello helps teams move work forward.</h1>
          <p>
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is
            unique—accomplish it all with Notello.
          </p>
          <Link className='home-link' to='/board'>
            Get Started!
          </Link>
        </div>
      </div>
      <div className='hero2-container'>
        <img className='hero2-img' src={hero2} />
      </div>
    </div>
  );
};
