import React, { useState, useEffect } from 'react';
import { useAuth } from '../custom-hooks';

const AdminUsers = ({ users }) => {
  return (
    <div id='allusers-container'>
      <h2 id='allusers-header'>All Users</h2>
      <div id='allusers-map-container'>
        {users &&
          users.map((user) => {
            return (
              <div
                key={user.id}
                className='user'
              >
                <p>
                  <span className='liltitle'>Full Name:</span> {user.name}
                </p>
                <p>
                  <span className='liltitle'>Username: </span>
                  {user.username}
                </p>
                <p>
                  <span className='liltitle'>Email: </span>
                  {user.email}
                </p>
                <p>
                  <span className='liltitle'>Zip Code: </span> {user.zipcode}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AdminUsers;
