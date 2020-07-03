import React, { useState } from 'react';
import ArrayCarousel from './ArrayCarousel';
import Styles from 'styles/Work.css';

export default function PostContainer ({item, i, activeCarousels, setActiveCarousels}) {
  const [index, setIndex] = useState(0);
  return (
    <div>
      <div className={Styles.number}>{index + 1} / {item.uploads.length}</div>
        <ArrayCarousel 
          array={item.uploads} 
          carouselIndex={i} 
          activeCarousels={activeCarousels}
          setActiveCarousels={setActiveCarousels}
          returnIndex={setIndex}
        />
    </div>
  );
};