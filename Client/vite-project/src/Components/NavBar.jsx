import React, { useState } from 'react';

const navLinks = [
  { navLinkId: 'Home', scrollToId: 'home-container' },
  { navLinkId: 'About', scrollToId: 'about-container' },
  { navLinkId: 'Services', scrollToId: 'services-container' },
  { navLinkId: 'Testimonials', scrollToId: 'testimonials-container' },
  { navLinkId: "FAQ's", scrollToId: 'faqs-container' },
  { navLinkId: 'Contact', scrollToId: 'contact-container' },
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

const NavBar = () => {
  const [activeNavLinkId, setActiveNavLinkId] = useState('');

  return (
    <div>
      <nav>
        {navLinks.map(({ navLinkId, scrollToId }) => (
          <NavLink
            navLinkId={navLinkId}
            scrollToId={scrollToId}
            activeNavLinkId={activeNavLinkId}
            setActiveNavLinkId={setActiveNavLinkId}
          />
        ))}

        {/* <NavLink
          id='home'
          to='/'
        >
          Home
        </NavLink>
        <NavLink to='/'>About</NavLink>
        <NavLink to='/'>Services</NavLink>
        <NavLink to='/'>Testimonials</NavLink>
        <NavLink to='/'>FAQ's</NavLink>
        <NavLink to='/'>Contact</NavLink>
        <NavLink to='/'>Calendar</NavLink> */}
      </nav>
    </div>
  );
};

export default NavBar;
