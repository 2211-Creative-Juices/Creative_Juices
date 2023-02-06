import React from 'react';
import ContactForm from './Contact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import CJlogonobckgrnd from '../assets/images/CJlogonobckgrnd.png';


const Footer = () => {
  return (
    <footer id='footer-container'>
       <div>
      <img id='footer-logo' src={CJlogonobckgrnd}></img>
      </div>
      <div className='socials'>
        <div>
          <a href='https://www.instagram.com/creativejuices.paint/?fbclid=IwAR1_TkmS9e-EwyQy98DVkQoBaHB21TzEQRe1wRTDB25ENU9tcapIWKZROc4'>
            <FontAwesomeIcon
              className='instagram-social'
              icon={faInstagram}
              size='3x'
              color='black'
            />
          </a>
        </div>
        <div>
          <a href='https://www.facebook.com/creativejuices.paint'>
            <FontAwesomeIcon
              className='facebook-social'
              icon={faSquareFacebook}
              size='3x'
              color='black'
            />
          </a>
        </div>
      </div>
      <div>
        <ContactForm />
      </div>
    </footer>
  );
};

export default Footer;
