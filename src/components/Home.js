import React, { Component, useEffect, useState, useContext } from 'react';
import { ConfigContext } from '../routes';
import Header from './Header';
import Intro from './Intro';
import ProtectionServices from './ProtectionServices';
import BeforeAndAfter from './BeforeAndAfter';
import OurWork from './OurWork';
import Benefits from './Benefits';
import HeadQuarters from './HeadQuarters';
import Connect from './Connect';
import styles from 'styles/Home.css';

export default function Home () {
  const [height, setHeight] = useState(0)
  useEffect(() => {
    setHeight(window.innerHeight)
  }, [window.innerHeight])
  return (
    <div>
      {/* <div className={styles.testing}>{height}</div> */}
      <Intro />
      <ProtectionServices />
      <BeforeAndAfter />
      <Benefits />
      <OurWork />
      <HeadQuarters /> 
      <Connect heading={"Contact us"}/>
    </div>
  );
};