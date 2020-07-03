import React from 'react';
import Styles from 'styles/Loader.css';

export default function Loader ({height, width, thickness, marginLeft, styles}) {
  return (
    <div 
      className={Styles.loader}
      style={{
        ...styles,
        height,
        width,
        marginLeft,
        border: `${thickness} solid #f3f3f3`,
        borderTop: `${thickness} solid #ff9f00`
      }}
    />
  );
};