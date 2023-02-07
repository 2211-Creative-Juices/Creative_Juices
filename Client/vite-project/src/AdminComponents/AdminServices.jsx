import React, { useState, useEffect } from 'react';
import { useAuth } from '../custom-hooks';

const AdminServices = ({ services }) => {
  const user = useAuth();
  console.log('these are admin all services', services);
  return (
    <div id='admin-services-container'>
      <h2 id='admin-services-header'>Services</h2>
      <div id='admin-services-map-container'>
        {services &&
          services.map((service) => {
            return (
              <div
                key={service.id}
                className='service'
              >
                <p>
                  <span className='liltitle'>Service ID: </span>
                  {service.id}
                </p>
                <p>
                  <span className='liltitle'>Service Type: </span>
                  {service.type}
                </p>
                <p>
                  <span className='liltitle'>In-Person/Virtual: </span>
                  {service.isremote}
                </p>
                <p>
                  <span className='liltitle'>Number of Guests: </span>
                  {service.guests}
                </p>
                <p>
                  <span className='liltitle'>Cost: </span>
                  {service.cost}
                </p>
                <p>
                  <span className='liltitle'>Location: </span>
                  {service.location}
                </p>
                <p>
                  <span className='liltitle'>Date: </span>
                  {service.date}
                </p>
                <p>
                  <p className='liltitle'>Notes: </p>
                  {service.notes}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AdminServices;
