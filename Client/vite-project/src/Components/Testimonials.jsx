import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const Testimonials = () => {
  return (
    <div id='testimonial-all'>
      <div className='parallax1'></div>

      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={6100}
      >
        <div className='myCarousel'>
          <h3>Chelsea Haldane</h3>
          <h4>Devleoper</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div>
          {/* <img src='/images/daniel.png' /> */}
          <div className='myCarousel'>
            <h3>Ashley Hoath</h3>
            <h4>Developer</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        <div>
          {/* <img src='/images/theo.png' /> */}
          <div className='myCarousel'>
            <h3>Philip Rau</h3>
            <h4>Developer</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div>
          {/* <img src='/images/theo.png' /> */}
          <div className='myCarousel'>
            <h3>Megan Miller</h3>
            <h4>Developer</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </Carousel>
      <div className='parallax1'></div>
    </div>
  );
};

// const Testimonials = () => {
//   return (
//     <div id='testimonials-container'>
//       <h3 id='testimonials-header'>Hear from past customers!</h3>

//       <div className='parallax1'></div>

//       <div className='parallax2'></div>
//     </div>
//   );
// };

export default Testimonials;

{
  /* <div className='testimonial-container'>
        <span id='testimonial-1'></span>
        <span id='testimonial-1'></span>

        <div class='testimonial-package'>
          <div className='testimonial'>
            <h4>Review Name, written by Megan Miller.</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>

          <div className='testimonial'>
            <h4>Review Name, written by Megan Miller.</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
        </div>
      </div> */
}
