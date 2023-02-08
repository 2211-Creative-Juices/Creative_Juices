import React from 'react';
import ContactForm from './Contact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import shellcontact from '../assets/images/shellcontact.png';
import CJlogonobckgrnd from '../assets/images/CJlogonobckgrnd.png';

const Footer = () => {
  return (
    <footer id='footer-container'>
      <div id='footer-logo-container'>
        <img id='footer-logo' src={CJlogonobckgrnd}></img>
      </div>
      <div id='shellimg-contact'>
        <img id='shellimg' src={shellcontact}></img>
        <p> Thank you for supporting my small business!</p>
      </div>
      <div className='socials'>
        <div>
          <a
            href='https://www.instagram.com/creativejuices.paint/?fbclid=IwAR1_TkmS9e-EwyQy98DVkQoBaHB21TzEQRe1wRTDB25ENU9tcapIWKZROc4'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon
              className='instagram-social'
              icon={faInstagram}
              size='3x'
              color='black'
            />
          </a>
        </div>
        <div>
          <a
            href='https://www.facebook.com/creativejuices.paint'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon
              className='facebook-social'
              icon={faSquareFacebook}
              size='3x'
              color='black'
            />
          </a>
        </div>
        <div>
          <a
            href='https://www.tiktok.com/@creativejuices_paint?_t=8Zi0xluFD8U&_r=1'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FontAwesomeIcon
              className='tiktok-social'
              icon={faTiktok}
              size='3x'
              color='black'
            />
          </a>
        </div>
      </div>
      <div id='contact-container'>
        <ContactForm />
      </div>
    </footer>
  );
};

export default Footer;
