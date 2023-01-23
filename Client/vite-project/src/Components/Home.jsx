import React from 'react';
import paint from '../assets/images/paint.jpg';

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${paint})`,
        backgroundRepeat: 'no-repeat',
      }}
      id='home-container'
    >
      <div id='home-message'> This is the home</div>
    </div>
  );
};

export default Home;
