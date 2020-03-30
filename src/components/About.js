import React from 'react';
import SlideShow from './SlideShow';
import Styles from 'styles/About.css';

const obj = {
  url: 'assets/carone.jpg',
  heading: 'About us',
  description: 'Professional paint protection installers with over 15 years of experience working on dozens of high end car brands',
  bottomStatement: 'Learn more about us below',
  slides: [
    { id: 0, url: '/assets/slideImage-1.jpg' },
    { id: 1, url: '/assets/slide3-min.jpg' },
    { id: 2, url: '/assets/slide2-min.jpg' },
    { id: 3, url: '/assets/slide1-min.jpg' }
  ] 
};

export default function About () {
  return (
    <div>
      <SlideShow obj={obj} />
      <div></div>
    </div>
  );
};