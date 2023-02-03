import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartImage from '../CartComponents/CartNavImage';

const navLinks = [
  { navLinkId: 'Home', scrollToId: 'home-container' },
  { navLinkId: 'About', scrollToId: 'about-container' },
  { navLinkId: 'Services', scrollToId: 'services-container' },
  { navLinkId: 'Testimonials', scrollToId: 'testimonials-container' },
  { navLinkId: "FAQ's", scrollToId: 'faqs-container' },
  { navLinkId: 'Contact', scrollToId: 'footer-container' },
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
  const [activeNavLinkId, setActiveNavLinkId] = useState('');

  return (
    <div className='is-sticky'>
      <nav>
        {navLinks.map(({ navLinkId, scrollToId }) => (
          <NavLink
            key={navLinkId}
            navLinkId={navLinkId}
            scrollToId={scrollToId}
            activeNavLinkId={activeNavLinkId}
            setActiveNavLinkId={setActiveNavLinkId}
          />
        ))}
        <CartImage orders={orders} />
      </nav>
    </div>
  );
};

export default NavBar;
