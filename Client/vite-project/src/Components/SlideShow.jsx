import React from 'react';
import './slideshow.css';
import collage from '../assets/images/collage.png';
import paint from '../assets/images/paint.jpg';

const SlideShow = () => {
  return (
    <div>
      <div className='fancywords'>
        <h2 className='title'>
          <span className='title-word title-word-1'>Sign</span>
          <span className='title-word title-word-2'>up</span>
          <span className='title-word title-word-3'>to</span>
          <span className='title-word title-word-4'>paint!</span>
        </h2>
      </div>
      <div className='container'>
        <div className='wrapper'>
          <img src={collage}></img>
          <img src={paint}></img>
          <img src={collage}></img>
          <img src={paint}></img>
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
