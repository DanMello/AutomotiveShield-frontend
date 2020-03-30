import React from 'react';
import ConditionalWrapper from './ConditionalWrapper';
import useWindowResize from '../hooks/useWindowSize';
import Styles from 'styles/Benefits.css';
import LongCarousel from './LongCarousel';

export default function Benefits() {
  const screenSize = useWindowResize();
  return (
    <div className={Styles.container}>
      <div className={Styles.heading}>Paint Protection Benefits</div>
      <div className={Styles.line}></div>
      <div className={Styles.subContainer}>

        <ConditionalWrapper
          condition={screenSize < 1110}
          wrapper={children => <LongCarousel activeColor={'#ff9f00'} normalColor={'#444'} dots={true} noRow={true} time={10000}>{children}</LongCarousel>}
          >
          <div className={Styles.descriptionContainer}>
            <div className={Styles.headingTwo}>Protects and preserves</div>
            <div className={Styles.description}>
              PPF protects your paint from damage caused by debris, scratches, bugs and chemicals while also preserving your paint from discoloration caused by the sun's UV rays. 
            </div>
          </div>

          <div className={Styles.descriptionContainer}>
            <div className={Styles.headingTwo}>Cost-effectiveness</div>
            <div className={Styles.description}>
              PPF helps protect your vehicles exterior so you don't have to spend money frequently on damage repairs and helps retain your vehicles new-like appearance.
            </div>
          </div>

          <div className={Styles.descriptionContainer}>
            <div className={Styles.headingTwo}>Easier to clean</div>
            <div className={Styles.description}>
              PPF repels dust preventing your vehicles exterior from a dust build up problem making it easier to clean. PPF also helps keep your vehicle cleaner longer after washing it.
            </div>
          </div>
        </ConditionalWrapper>
      </div>
      <div className={Styles.seeMore}>
        See some of our recent work below
      </div>
    </div>
  );
};