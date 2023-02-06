import React from 'react';
import { Link } from 'react-router-dom';
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
       <p>
        Book a class with Shelley!
        <Link to='/signup'>Book Class</Link>!
       </p>

       <p>
          Already have an account?
          <Link to='/login'>Login Here</Link>!
        </p>
       
      <div id='home-message'> This is the home</div>
    </div>
  );
};

export default Home;
