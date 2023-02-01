import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <header>
        <NavLink to='/allservices'>All Services</NavLink>
        <NavLink to='/allorders'>All Orders</NavLink>
        <NavLink to='/allusers'>All Users</NavLink>
      </header>
    </div>
  );
};

export default Dashboard;
