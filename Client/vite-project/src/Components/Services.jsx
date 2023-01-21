import React from "react";

const AllServices = ({services}) => {
    return (
        <div id="services-container">
            <h2 id="services-header">
                Services
                
            </h2>  
            <div id="services-map-container">
                {services.map((service) => {
                    return(
                        <div key={service.id} className='service'>
                            <h3>Service Name: {service.name}</h3>
                            <p>Service Type: {service.type}</p>
                            <p>In-Person/Virtual: {service.isremote}</p>
                            <p>Number of Guests: {service.guests}</p>
                            <p>Cost: {service.cost}</p>
                            <p>Location: {service.location}</p>
                            <p>Date: {service.date}</p>
                            <p>Note: {service.notes}</p>
                        </div>
                    )
                })}
            </div>        
        </div>
    )
}

export default AllServices;