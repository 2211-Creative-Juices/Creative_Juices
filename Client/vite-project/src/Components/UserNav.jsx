import React from 'react';
import { NavLink } from 'react-router-dom';

const UserNav = () => {
  return (
    <div>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/'>About</NavLink>
        <a href='/#service-container'> SERVICES </a>
        {/* <NavLink to='/#service-form'>Services</NavLink> */}
        <NavLink to='/'>Testimonials</NavLink>
        <NavLink to='/'>FAQ's</NavLink>
        <NavLink to='/'>Contact</NavLink>
      </nav>
    </div>
  );
};

export default UserNav;
