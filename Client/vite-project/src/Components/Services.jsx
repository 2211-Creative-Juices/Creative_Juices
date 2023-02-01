import React, { useState, useEffect } from 'react';
import { getServicesByUser } from '../api/services';
import { useAuth } from '../custom-hooks';

const AllServices = ({ services }) => {
  const user = useAuth();
  const [myServices, setMyServices] = useState([]);
  console.log('this is myServices!:', myServices);
  // console.log('this is token:', user.token);
  // console.log('@@@@@@this is user ID:', user.user.id);
  let userId = user.user.id;

  // let purchaserId = orders.purchaserId;

  useEffect(() => {
    const getAllMyServices = async () => {
      const allMyServices = await getServicesByUser(user.token, userId);
      setMyServices(allMyServices, ...myServices);
      console.log('#####this is my all my services:', allMyServices);
    };
    if (user.user.id) {
      getAllMyServices();
    }
  }, [userId]);
  // console.log("********* this is my services:", myServices);

  let latestService = myServices.slice(-1);
  console.log('THIS IS MY LATEST SERVICE', latestService);

  return (
    <div id='services-container'>
      <h2 id='services-header'>Services</h2>
      <div id='services-map-container'>
        {myServices &&
          latestService.map((service) => {
            return (
              <div key={service.id} className='service'>
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

export default AllServices;
