import React from 'react';
import Styles from 'styles/Banner.css';

export default function Banner ({heading, color, fontColor}) {
  return (
    <div className={Styles.container} style={{background: color}}>
      <div className={Styles.heading} style={{color: fontColor}}>{heading}</div>
      <div className={Styles.line}></div>
    </div>
  );
};