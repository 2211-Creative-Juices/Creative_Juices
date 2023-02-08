import React from 'react';
import shelleyimg from '../assets/images/shelleyimg.jpeg';
import '../about.css';

const About = () => {
  return (
    <div id='about-container'>
      <h3 id='about-header'>About Creative Juices</h3>

      <div className='about-content'>
        <div id='para-about'>
          Hi! My name is Shelley and I have been creating art for as long as I
          can remember. I am passionate about people having the opportunity and
          ability to do creative things that they never imagined they were
          capable off. This is why I decided to follow my dream of starting a
          small business the combines my love of art and my long time experience
          with teaching. I have been in the school system for over 6 years and
          it has allowed me to explore the most impactful ways to teach new
          skills for people with all learning abilities and backgrounds.
          <div id='space-about'>
            I have found watercolor to be a truly amazing medium to work with
            and once you have some basic knowledge on how to manipulate it, it
            becomes very easy to take on projects at home or with friends. I
            hope that this will offer you a relaxing double-date night, or some
            entertainment for the kids table at a wedding, or just an
            opportunity to try something that you never though you could do. In
            my free time you will find me mountian biking or hiking with my
            husband and my two dogs (Griffin and Mowgli). Thanks for checking
            out my site and I looke forward to hearing from you!
          </div>
        </div>
        <div>
          <img id='prettyshelley' src={shelleyimg}></img>
        </div>
      </div>
    </div>
  );
};

export default About;
