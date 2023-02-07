import React, { useState, useEffect } from 'react';
import { useAuth } from '../custom-hooks';

const AdminUsers = ({ users }) => {
  return (
    <div id='allusers-container'>
      <h2 id='allusers-header'>All Users</h2>
      <div id='alluserss-map-container'>
        {users &&
          users.map((user) => {
            return (
              <div
                key={user.id}
                className='user'
              >
                <h3>User Info:</h3>
                <p>User Full Name: {user.name}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Zip Code: {user.zipcode}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AdminUsers;
