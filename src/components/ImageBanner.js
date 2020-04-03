import React from 'react';
import Styles from 'styles/ImageBanner.css';

export default function ImageBanner ({url, heading, paragraph, bottomStatement}) {
  return (
    <div className={Styles.container} style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)), url(${url})` }}>
      <div className={Styles.insideContainer}>
        <div className={Styles.heading}>{heading}</div>
        <div className={Styles.line}></div>
        <div className={Styles.paragraph}>{paragraph}</div>
        <div className={Styles.bottomStatement}>{bottomStatement}</div>
      </div>
    </div>
  );
};