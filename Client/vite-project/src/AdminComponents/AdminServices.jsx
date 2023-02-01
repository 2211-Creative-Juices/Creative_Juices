import React, { useState, useEffect } from 'react';
import { useAuth } from '../custom-hooks';

const AdminServices = ({ services }) => {
  const user = useAuth();
  console.log('these are admin all services', services);
  return (
    <div id='services-container'>
      <h2 id='services-header'>Services</h2>
      <div id='services-map-container'>
        {services &&
          services.map((service) => {
            return (
              <div
                key={service.id}
                className='service'
              >
                <h3>Service:</h3>
                <p>Service Type: {service.type}</p>
                <p>In-Person/Virtual: {service.isremote}</p>
                <p>Number of Guests: {service.guests}</p>
                <p>Cost: {service.cost}</p>
                <p>Location: {service.location}</p>
                <p>Date: {service.date}</p>
                <p>Note: {service.notes}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AdminServices;
