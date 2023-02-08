import React, { useState } from 'react';
import faqs from '../assets/images/faqs.jpeg';

const FAQs = () => {
  const [openPlease1, setOpenPlease1] = useState(false);
  const [openPlease2, setOpenPlease2] = useState(false);
  const [openPlease3, setOpenPlease3] = useState(false);
  const [openPlease4, setOpenPlease4] = useState(false);
  const [openPlease5, setOpenPlease5] = useState(false);
  const [openPlease6, setOpenPlease6] = useState(false);

  const handlePlease1 = () => {
    setOpenPlease1(!openPlease1);
  };

  const handlePlease2 = () => {
    setOpenPlease2(!openPlease2);
  };

  const handlePlease3 = () => {
    setOpenPlease3(!openPlease3);
  };

  const handlePlease4 = () => {
    setOpenPlease4(!openPlease4);
  };

  const handlePlease5 = () => {
    setOpenPlease5(!openPlease5);
  };

  const handlePlease6 = () => {
    setOpenPlease6(!openPlease6);
  };

  return (
    <div id='faqs-container'>
      <h3 id='faqs-header'>Frequently Asked Questions:</h3>

      <div className='faqs-content'>
        <div className='questions'>
          <p>
            <p className='question' onClick={handlePlease1}>
              What does a Paint and Sip involve? +
            </p>
            {openPlease1 ? (
              <p>
                A 90 minute long session of guided watercolor painting. This
                will include all supplies and the ability to take home 2-3
                finished greeting cards and the basic skills and knowledge to
                repeate at home. Shelley will be choosing a season appropriate
                design for your group.{' '}
              </p>
            ) : null}
          </p>
          <p>
            <p className='question' onClick={handlePlease2}>
              How do we decide on location? +
            </p>
            {openPlease2 ? (
              <p>
                In the service form select the general location you would want
                to have it at. If you have more specific location requests
                select other and add it to the notes. If you are unsure about
                your location send her a message with the contact form. She will
                contact you and discuss local options that will host your group.{' '}
              </p>
            ) : null}
          </p>
          <p className='question' onClick={handlePlease3}>
            What about kid parties? +
          </p>
          {openPlease3 ? (
            <p>
              Shelleys background as a teacher makes her the perfect candidate
              to work with big groups of kis! Birthday parties, wedding tables,
              or just to provide a distraction for a parents night in painting
              is for all ages!.{' '}
            </p>
          ) : null}

          <p className='question' onClick={handlePlease4}>
            Is alcohol/coffee provided? +
          </p>
          {openPlease4 ? (
            <p>
              You are responsible for providing your own alcohol or purchasing
              from the location that the paint event is being held. What a great
              way to also support your local breweries and coffee shops!{' '}
            </p>
          ) : null}

          <p className='question' onClick={handlePlease5}>
            How many people can come and what is the cost? +
          </p>
          {openPlease5 ? (
            <p>
              I am currently limiting to groups between 4-20 people. The cost is
              $20 per person. If you want to do a group of 2 contact Shelley
              directly and we can discuss.{' '}
            </p>
          ) : null}
          <p className='question' onClick={handlePlease6}>
            What is a paint kit? +
          </p>
          {openPlease6 ? (
            <p>
              You will find everything we make is super easy to do alone at
              Home. Either purchase a full kit to continue to explore at home or
              to pull Shelley in for a virtual paint and sip!!{' '}
            </p>
          ) : null}
        </div>

        <div>
          <img id='faqsimg' src={faqs}></img>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
