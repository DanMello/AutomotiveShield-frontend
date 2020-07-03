import React from 'react';
import ImageBanner from './ImageBanner';
import Styles from 'styles/About.css';

export default function About () {
  return (
    <div>
      <ImageBanner 
        url={"/assets/ferrari/three.JPEG"} 
        heading={"About us"}
        paragraph={"Professional paint protection installers with over 15 years of experience working on dozens of high end car brands"}
        bottomStatement={"Learn more about us below"}
        // coverPosition={'top'}
      />
    </div>
  );
};