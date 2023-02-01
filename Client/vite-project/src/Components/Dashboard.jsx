import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <header className='adminDash'>
        <NavLink to='/allservices'>All Services</NavLink>
        <NavLink to='/completedorders'>Completed Orders</NavLink>
        <NavLink to='/incompleteorders'>Incomplete Orders</NavLink>
        <NavLink to='/allusers'>All Users</NavLink>
      </header>
    </div>
  );
};

export default Dashboard;
