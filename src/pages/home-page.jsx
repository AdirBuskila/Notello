import React from 'react';
import { HomeHeader1 } from '../cmps/home-header1';
import { Link } from 'react-router-dom';
import hero from '../assets/img/hero.png';
import hero2 from '../assets/img/board.png';

export class HomePage extends React.Component {
  render() {
    return (
      <div className='home-container flex column align-center'>
        <HomeHeader1 />
        <div className='hero-container flex '>
          <img className='hero-img' src={hero} />
          <div className='home-txt'>
            <h1>Notello helps teams move work forward.</h1>
            <p>
              Collaborate, manage projects, and reach new productivity peaks.
              From high rises to the home office, the way your team works is
              unique—accomplish it all with Notello.
            </p>
            <Link className='home-link' to='/board'>
              Get Started!
            </Link>
          </div>
        </div>
        <div className='hero2-container flex column align-center'>
          <h2>It's more than work. It's a way of working together.</h2>
          <p>
            Start with a Notello board, lists, and cards. Customize and expand
            with more features as your teamwork grows. Manage projects, organize
            tasks, and build team spirit—all in one place.
          </p>
          <img className='hero2-img' src={hero2} />
        </div>
      </div>
    );
  }
}
