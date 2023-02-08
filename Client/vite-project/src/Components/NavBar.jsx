import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartImage from '../CartComponents/CartNavImage';
import initialsnobckgrnd from '../assets/images/initialsnobckgrnd.png';

import { useAuth } from '../custom-hooks';

const navLinks = [
  { navLinkId: 'HOME', scrollToId: 'home-container' },
  { navLinkId: 'ABOUT', scrollToId: 'about-container' },
  { navLinkId: 'SERVICES', scrollToId: 'services-container' },
  { navLinkId: "FAQ's", scrollToId: 'faqs-container' },
  { navLinkId: 'TESTIMONIALS', scrollToId: 'testimonials-container' },
  { navLinkId: 'CONTACT', scrollToId: 'footer-container' },
];

const NavLink = ({
  navLinkId,
  scrollToId,
  activeNavLinkId,
  setActiveNavLinkId,
}) => {
  const handleClick = () => {
    setActiveNavLinkId(navLinkId);
    document.getElementById(scrollToId).scrollIntoView({
      behavior: 'smooth', // gives an ease-in-out effect to our scroll
    });
  };

  return (
    <span
      id={navLinkId}
      className={activeNavLinkId === navLinkId ? 'activeClass' : ''}
      onClick={handleClick}
    >
      {navLinkId}
    </span>
  );
};

const NavBar = ({ orders }) => {
  const { logout } = useAuth();
  const [activeNavLinkId, setActiveNavLinkId] = useState('');
  return (
    <div className='is-sticky'>
      <nav>
        <img id='initialslogo' src={initialsnobckgrnd}></img>
        {navLinks.map(({ navLinkId, scrollToId }) => (
          <NavLink
            key={navLinkId}
            navLinkId={navLinkId}
            scrollToId={scrollToId}
            activeNavLinkId={activeNavLinkId}
            setActiveNavLinkId={setActiveNavLinkId}
          />
        ))}
        <button id='logout-butt' onClick={logout}>
          Logout
        </button>
        <Link to='/usercart'>
          <CartImage orders={orders} />
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
