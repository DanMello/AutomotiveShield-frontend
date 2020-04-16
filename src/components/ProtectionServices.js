import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { animated, useTransition, useSpring } from 'react-spring'
import Styles from 'styles/protectionServices.css';

export default function ProtectionServices () {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [step, setStep] = useState(0);
  const [topContainerHeight, setTopContainerHeight] = useState(0);
  const [imageContainerHeight, setImageContainerHeight] = useState(280);
  const [descriptionContainerHeight, setDescriptionContainerHeight] = useState(0);
  const [initialDescriptionContainerHeight, setInitialDescriptionContainerHeight] = useState(0);
  const centeredMargin = ((window.innerHeight - (imageContainerHeight + initialDescriptionContainerHeight)) - topContainerHeight) / 2;
  const topContainer = useRef(null);
  const imageContainer = useRef(null);
  const descriptionContainer = useRef(null);
  const sectionOne = useRef(null);
  const sectionTwo = useRef(null);
  const sectionThree = useRef(null);
  const slides = [
    { id: 0, url: 'assets/standardpro.png' },
    { id: 1, url: 'assets/frontcoverpro.png' },
    { id: 2, url: 'assets/fullcoverpro.png' },
    { id: 3, url: 'assets/stealth.png' }
  ];
  const carIntroTransitions = useTransition(slides[step], item => item.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });
  const hideProps = useSpring({
    opacity: step > 0 ? 0 : 1
  });
  const titles = [
    { 
      id: 0,
      text: 'Standard Paint Protection',
      description: `
        Standard paint protection covers the hood, 
        front bumper, fenders, and mirrors.
      `,
      link: '#'
    },
    { 
      id: 1,
      text: 'Full Front Wrap Paint Protection',
      description: `
        Full front wrap paint protection covers
        the entire front hood, front bumper, fenders, mirrors and headlights.
      `,
      link: '#'
    },
    { 
      id: 2,
      text: 'Full Car Wrap Paint Protection',
      description: `
        Full car wrap paint protection covers 
        the entire body providing full protection for your car.
      `,
      link: '#'
    },
    { 
      id: 3, 
      text: 'Stealth Wrap paint Protection',
      description: `
        Stealth car wrap paint protection also covers the entire body of your car providing full coverage with a matte finish.
      `,
      link: '#'
    }
  ];
  const transitions = useTransition(titles[step], item => item.id, {
    from: { transform: 'translate3d(0,300px,0)', opacity: 0 },
    enter: { transform: `translate3d(0,10px,0)`, opacity: 1 },
    leave: { transform: 'translate3d(0,300px,0)', opacity: 0 },
  });
  
  useEffect(() => {
    setSizeForAbsoluteComponents();
  });

  useEffect(() => {
    if (topContainer.current !== null) {
      setTopContainerHeight(topContainer.current.offsetHeight);
    };
  }, [topContainer.current]);
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [step]);

  function setSizeForAbsoluteComponents() {
    if (imageContainer.current !== null) {
      if (imageContainer.current.offsetHeight > 200) {
        setImageContainerHeight(imageContainer.current.offsetHeight);
      };
    };
    if (descriptionContainer.current !== null) {
      if (descriptionContainer.current.offsetHeight > descriptionContainerHeight) {
        setDescriptionContainerHeight(descriptionContainer.current.offsetHeight);
      };
      if (descriptionContainerHeight === 0) {
        setInitialDescriptionContainerHeight(descriptionContainer.current.offsetHeight);
      }
    };
  };

  function handleResize() {
    setScreenSize(window.innerWidth);
    setScreenHeight(window.innerHeight);
    setSizeForAbsoluteComponents();
  };

  function ImageLoaded() {
    if (imageContainer.current !== null) {
      setImageContainerHeight(imageContainer.current.offsetHeight);
    };
  };

  function handleScroll () {
    const scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const sectionOneOffsetHeight = sectionOne.current.offsetHeight;
    const sectionOneOffsetTop = sectionOne.current.offsetTop;
    const sectionTwoOffsetHeight = sectionTwo.current.offsetHeight;
    const sectionTwoOffsetTop = sectionTwo.current.offsetTop;
    const sectionThreeOffsetHeight = sectionThree.current.offsetHeight;
    const sectionThreeOffsetTop = sectionThree.current.offsetTop;
    if (
        (scrollTop + sectionOneOffsetHeight) > sectionOneOffsetHeight && 
        (scrollTop < sectionOneOffsetTop)
      )
    {
      if (step !== 0) {
        setStep(0);
      };
    } else if (
        (scrollTop + sectionTwoOffsetHeight) > sectionTwoOffsetHeight && 
        (scrollTop < sectionTwoOffsetTop)
      )
    {
      if (step !== 1) {
        setStep(1);
      };
    } else if (
        (scrollTop + sectionThreeOffsetHeight) > sectionThreeOffsetHeight && 
        (scrollTop < sectionThreeOffsetTop)
      )
    {
      if (step !== 2) {
        setStep(2);
      };
    } else {
      if (step !== 3 && step !== 0) {
        setStep(3);
      };
    };
  };
  return (
    <div style={{'marginBottom': imageContainerHeight + descriptionContainerHeight + 60 + 'px'}}>
      <div className={(screenSize > 768 & screenHeight > 840) ? Styles.test1 : null}>
        <div className={Styles.ourServicesContainer} ref={topContainer}>
          <div className={Styles.ourServices}>Our Services</div>
          <div className={Styles.line2}></div>
        </div>
      </div>
      <div className={Styles.test2} style={{"top": centeredMargin < 0 ? 0 : centeredMargin + 'px'}}>
        <div className={Styles.imageContainer}>
          {carIntroTransitions.map(({ item, props, key }) => (
            <animated.div style={props} key={key} className={Styles.animatedCarContainer} ref={imageContainer}>
              <img
                onLoad={ImageLoaded}
                src={item.url}
                className={Styles.image}
              />
            </animated.div>
          ))}
          <div className={Styles.descriptionContainer} style={{"top": imageContainerHeight}}>
            {transitions.map(({ item, key, props }) => 
              item &&
                <animated.div key={key} style={props} ref={descriptionContainer}>
                  <div className={Styles.title}>{item.text}</div>
                  <div className={Styles.lineContainer}><div className={Styles.line}></div></div>
                  <div className={Styles.bottomDescription}>{item.description}</div>
                  <div className={Styles.learnMore2Container}>
                    <Link to={item.link} className={Styles.learnMore2}>
                      Learn more
                      <FontAwesomeIcon icon={faChevronRight} className={Styles.rightIcon}/>
                    </Link>
                  </div>
                </animated.div>
            )}
          </div>
        </div>
        {screenSize > 768 && 
          <animated.div className={Styles.scrollDownContainer} style={{...hideProps, "top": imageContainerHeight + initialDescriptionContainerHeight + (centeredMargin / 2)}}>
            <div className={Styles.scrollDown}>Scroll down to see more services</div>
            <FontAwesomeIcon icon={faChevronDown} className={Styles.rightIcon}/>
          </animated.div>
        }
      </div>
      <div className={Styles.sections}></div>
      <div className={Styles.sections} ref={sectionOne}></div>
      <div className={Styles.sections} ref={sectionTwo}></div>
      <div className={Styles.sections} ref={sectionThree}></div>
    </div>
  );
};