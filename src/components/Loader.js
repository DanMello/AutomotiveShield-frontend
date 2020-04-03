import React from 'react';
import Styles from 'styles/Loader.css';

export default function Loader ({height, width, thickness, marginLeft}) {
  return (
    <div 
      className={Styles.loader}
      style={{
        height,
        width,
        marginLeft,
        border: `${thickness} solid #f3f3f3`,
        borderTop: `${thickness} solid #ff9f00`
      }}
    />
  );
};