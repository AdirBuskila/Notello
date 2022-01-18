import { AppHeader } from '../cmps/app-header';
import hero from '../assets/img/hero.png';

export const HomePage = () => {
  return (
    <div className='home-container flex column align-center'>
      <AppHeader />
      <h3> Welcome To The Home Page</h3>
      <div className='hero-container'>
        <img className='hero-img' src={hero} />
      </div>
      <div className='home-txt'>
        <h1>Notello helps teams move work forward.</h1>
        <p>
          Collaborate, manage projects, and reach new productivity peaks. From
          high rises to the home office, the way your team works is
          unique—accomplish it all with Notello.
        </p>
      </div>
    </div>
  );
};
