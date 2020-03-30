import React from 'react';
import SlideShow from './SlideShow';
import Styles from 'styles/Intro.css';

const obj = {
  heading: 'Car paint needs protection',
  description: 'We provide professional paint protection services so your car can maintain that long term shine.',
  bottomStatement: 'Learn more below',
  slides: [
    { id: 0, url: '/assets/slide1-min.jpg' },
    { id: 1, url: '/assets/slide2-min.jpg' },
    { id: 2, url: '/assets/slide3-min.jpg' },
    { id: 3, url: '/assets/slide4-min.jpg' }
  ]
};

export default function Intro () {
  return (
    <div>
      <SlideShow obj={obj} />
    </div>
  );
};