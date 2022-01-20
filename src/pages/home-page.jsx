import React from 'react';
import { HomeHeader1 } from '../cmps/home-header1';
import { Link } from 'react-router-dom';
import hero from '../assets/img/hero.png';
import hero2 from '../assets/img/board.png';
import hero3 from '../assets/img/view.svg';

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
        <div className='features flex column'>
          <div className='card-info'>
            <h2>Features to help your team succeed</h2>
            <p>
              Powering a productive team means using a powerful tool (and plenty
              of snacks). From meetings and projects to events and goal setting,
              Notello's intuitive features give any team the ability to quickly
              set up and customize workflows for just about anything.
            </p>
          </div>
          <div className='hero3-container flex'>
            <img className='hero3-img' src={hero3} />
            <div className='info'>
              <h4>CHOOSE A VIEW</h4>
              <h2>The board is just the beginning</h2>
              <p>
                Lists and cards are the building blocks of organizing work on a
                Notello board. Grow from there with task assignments, timelines,
                productivity metrics, calendars, and more.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
