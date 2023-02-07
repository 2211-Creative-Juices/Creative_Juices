import React from 'react';
import { Link } from 'react-router-dom';
import homebackground from '../assets/images/homebackground.jpg';
import CJlogonobckgrnd from '../assets/images/CJlogonobckgrnd.png';



const Home = () => {
  return (

    <div>
      <div
        style={{
          backgroundImage: `url(${homebackground})`,
          backgroundRepeat: 'no-repeat',
        }}
        id='home-container'>
        <img id='home-logo' src={CJlogonobckgrnd}></img>
        <div id='links-container'>
          <div id='sign-up-home'>
            Book an event with Shelley!
            <br></br>
            <Link to='/signup'>Sign Up Here</Link>
          </div>
          <div id='log-in-home'>
            Already have an account?
            <br></br>
            <Link to='/login'>Log In Here</Link>!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
