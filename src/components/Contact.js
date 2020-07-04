import React, { useState } from 'react';
import ImageBanner from './ImageBanner';
import GoogleMap from './GoogleMap';
import Styles from 'styles/Contact.css';
import Connect from './Connect';
import HeadQuarters from './HeadQuarters';

export default function Contact () {

  const [location, setLocation] = useState('Florida');

  return (
    <div>
      <ImageBanner
        url={"/assets/lambo_truck/two.jpeg"} 
        heading={"Contact us"}
        paragraph={"Are you ready to protect your vehicles paint? We are standing by if you have any questions."}
        bottomStatement={"See our contact info below"}
      />
      <HeadQuarters theme={'light'}></HeadQuarters>
      <Connect heading={'Send us a message'}/>
    </div>
  );
};