import hero from '../assets/img/hero.png'

export const HomePage = () => {
  return (
    <div className='home-container flex column align-center'>
      Welcome To The Home Page
      <div className="hero-container">
      <img className='hero-img' src={hero} / >
      </div>
    </div>
  );
};
    