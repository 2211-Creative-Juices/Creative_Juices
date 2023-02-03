import React from 'react';
import ContactForm from './Contact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer id='footer-container'>
      <div>CREATIVE JUICES INC.</div>
      <div className='socials'>
        <div>
          <a href='https://www.instagram.com/creativejuices.paint/?fbclid=IwAR1_TkmS9e-EwyQy98DVkQoBaHB21TzEQRe1wRTDB25ENU9tcapIWKZROc4'>
            <FontAwesomeIcon
              className='instagram-social'
              icon={faInstagram}
              size='3x'
              color='white'
            />
          </a>
        </div>
        <div>
          <a href='https://www.facebook.com/creativejuices.paint'>
            <FontAwesomeIcon
              className='facebook-social'
              icon={faSquareFacebook}
              size='3x'
              color='white'
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
