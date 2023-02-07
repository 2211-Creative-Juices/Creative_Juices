import React, { useState } from 'react';
import faqs from '../assets/images/faqs.jpeg';

const FAQs = () => {
  const [openPlease1, setOpenPlease1] = useState(false);
  const [openPlease2, setOpenPlease2] = useState(false);
  const [openPlease3, setOpenPlease3] = useState(false);

  const handlePlease1 = () => {
    setOpenPlease1(!openPlease1);
  };

  const handlePlease2 = () => {
    setOpenPlease2(!openPlease2);
  };

  const handlePlease3 = () => {
    setOpenPlease3(!openPlease3);
  };

  return (
    <div id='faqs-container'>
      <h3 id='faqs-header'>Frequently Asked Questions:</h3>

      <div className='faqs-content'>
        <div className='questions'>
          <p>
            <p
              className='question'
              onClick={handlePlease1}
            >
              LONG QUESTION ABOUT CREATIVE JUICES 1 +
            </p>
            {openPlease1 ? (
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.{' '}
              </p>
            ) : null}
          </p>
          <p>
            <p
              className='question'
              onClick={handlePlease2}
            >
              LONG QUESTION ABOUT CREATIVE JUICES 2 +
            </p>
            {openPlease2 ? (
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.{' '}
              </p>
            ) : null}
          </p>
          <p
            className='question'
            onClick={handlePlease3}
          >
            LONG QUESTION ABOUT CREATIVE JUICES 3 +
          </p>
          {openPlease3 ? (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.{' '}
            </p>
          ) : null}
        </div>
        <div>
          <img
            id='faqsimg'
            src={faqs}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default FAQs;