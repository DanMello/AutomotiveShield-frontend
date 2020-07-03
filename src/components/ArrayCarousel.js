import React, { useState, useContext, useEffect } from 'react';
import { ConfigContext } from '../routes';
import LongCarousel from './LongCarousel';
import Video from './Video';
import Styles from 'styles/ArrayCarousel.css';

export default function ArrayCarousel ({
  array, 
  carouselIndex,
  activeCarousels,
  setActiveCarousels,
  returnIndex
}) {
  const [index, setIndex] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(false);
  const videoType = ['video/quicktime', 'video/mp4'];
  const { url, env } = useContext(ConfigContext);
  const userDataUrl = env === 'production' ? '/assets' : url;

  return (
    <div style={{position: 'relative'}}>
      <div className={Styles.backgroundContainer} />
      <LongCarousel 
        dots={true} 
        noRow={true} 
        returnIndex={setIndex}
        carouselIndex={carouselIndex}
        activeCarousels={activeCarousels}
        setActiveCarousels={setActiveCarousels}
        forceUpdate={setForceUpdate}
        activeColor={'#ff9f00'} 
        normalColor={'#444'}
        returnIndex={returnIndex}
        arrowDots={true}
        >
        {array.map((item, i) => {
          return (
            <div key={i} className={Styles.pictureContainer}>
              {videoType.includes(item.mimetype) ?
                <Video
                  url={userDataUrl + item.publicFilePath} 
                  thumbnailUrl={userDataUrl + item.publicThumbnailPath} 
                  item={item}
                  index={index}
                  i={i}
                  forceUpdate={forceUpdate}
                  />
                :
                <div
                  className={Styles.picture}
                  style={{backgroundImage: `url(${userDataUrl}${item.publicFilePath})`}}
                  />
              }
            </div>
          )
        })}
      </LongCarousel>
    </div>
  );
};