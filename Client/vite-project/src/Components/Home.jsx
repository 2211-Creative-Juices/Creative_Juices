import React from 'react';
import homebackground from '../assets/images/homebackground.jpg';
import CJlogonobckgrnd from '../assets/images/CJlogonobckgrnd.png';

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${homebackground})`,
        backgroundRepeat: 'no-repeat',
      }}
      id='home-container'
    >
       <img id='logo' src={CJlogonobckgrnd}></img>
      <div id='home-message'> This is the home</div>
    </div>
  );
};

export default Home;
