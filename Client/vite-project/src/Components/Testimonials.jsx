import React from 'react';
import testimonial1 from "../assets/images/testimonial1.jpeg"

const Testimonials = () => {
  return (
    <div id='testimonials-container'>
      <h3 id='testimonials-header'>Hear from past customers!</h3>
    
      <div className='testimonials-content'>
        <div>
          <img id='testimonial1' src={testimonial1}></img>
        </div>
        <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. 
        </div>
        
      </div>
    </div>
  );
};

export default Testimonials;
