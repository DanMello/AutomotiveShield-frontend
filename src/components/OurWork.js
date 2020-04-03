import React, {useEffect, useState, useRef} from 'react';
import useWindowResize from '../hooks/useWindowSize';
import LongCarousel from './LongCarousel';
import { Link } from 'react-router-dom';
import {useTransition, animated, useChain, config} from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import Styles from 'styles/OurWork.css';
import ConditionalWrapper from './ConditionalWrapper';
import GalleryStyles from 'styles/Gallery.css';

const height = window.innerHeight / 2 + 'px';

const slides = [
  { id: 0, url: '/assets/smallslide1-min.JPEG' },
  { id: 1, url: '/assets/smallslide2-min.JPEG' },
  { id: 2, url: '/assets/smallslide3-min.JPEG' },
];

const data = [
  {
    job: "Full Front Wrap",
    car: "Lamborghini Hurucan",
    date: "Feb 23, 2019",
    description: "This project was cool",
    img: "assets/lambo/one.JPG",
    array: [
      "assets/lambo/one.JPG",
      "assets/lambo/two.JPG",
      "assets/lambo/three.JPG",
      "assets/lambo/four.JPG",
      "assets/lambo/five.JPG",
      "assets/lambo/six.JPG",
    ],
    scale: "1"
  },
  {
    job: "Full Car Wrap",
    car: "Audi R8",
    date: "Feb 23, 2019",
    description: "This project was cool",
    img: "assets/audi/six.JPEG",
    array: [
      "assets/audi/one.JPEG",
      "assets/audi/two.JPEG",
      "assets/audi/three.JPEG",
      "assets/audi/four.JPEG",
      "assets/audi/five.JPEG",
      "assets/audi/six.JPEG",
    ],
    scale: "1"
  },
  {
    job: "Full Car Wrap",
    car: "Porshe GT3 RS",
    date: "Feb 23, 2019",
    description: "This project was cool",
    img: "assets/porshe/two.jpeg",
    array: [
      "assets/porshe/one.jpeg",
      "assets/porshe/two.jpeg",
      "assets/porshe/three.jpeg",
      "assets/porshe/four.jpeg",
      "assets/porshe/five.jpeg",
    ],
    scale: "1"
  },
  {
    job: "Full Front Wrap",
    car: "Ferrari F430",
    date: "Feb 23, 2019",
    description: "This project was cool",
    array: [
      "assets/ferrari/one.JPEG",
      "assets/ferrari/two.JPEG",
      "assets/ferrari/three.JPEG",
      "assets/ferrari/four.JPEG",
      "assets/ferrari/five.JPEG",
      "assets/ferrari/six.JPEG",
    ],
    img: "assets/ferrari/six.JPEG",
    scale: "1"
  },
  {
    job: "Full Front Wrap",
    car: "Lamborghini Urus",
    date: "Feb 23, 2019",
    description: "This project was cool",
    img: "assets/carone-min.jpg",
    array: [
      "assets/lambo_truck/one.jpeg",
      "assets/lambo_truck/two.jpeg",
      "assets/lambo_truck/three.jpeg",
      "assets/lambo_truck/four.jpeg",
      "assets/lambo_truck/five.jpg",
    ],
    scale: "1"
  },
  {
    job: "Full Front Wrap",
    car: "BMW M3",
    date: "Feb 23, 2019",
    description: "This project was cool",
    img: "assets/bmw/eight.JPEG",
    array: [
      "assets/bmw/one.JPEG",
      "assets/bmw/two.JPEG",
      "assets/bmw/three.JPEG",
      "assets/bmw/four.JPEG",
      "assets/bmw/five.JPEG",
      "assets/bmw/six.JPEG",
      "assets/bmw/seven.JPEG",
      "assets/bmw/eight.JPEG",
    ],
    scale: "1"
  }
];

function FullScreenBackground({children, show, fullScreenRef}) {

  const fullScreenContainerTransition = useTransition(show, null, {
    ref: fullScreenRef,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  
  return fullScreenContainerTransition.map(({item, key, props}) => 
    item && <animated.div key={key} style={props} className={GalleryStyles.container}>
      {children}
    </animated.div>
  );
};

function Gallery({setShow, project, screenSize, show, position}) {

  const [index, setIndex] = useState(0);

  const fullScreenContainerRef = useRef();

  const carouselDesktopTransitionRef = useRef();
  const carouselDesktopTransition = useTransition(show, null, {
    ref: carouselDesktopTransitionRef,
    from: { position: 'absolute', opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const carouselMobileTransitionRef = useRef();
  const carouselMobileTransition = useTransition(show, null, {
    ref: carouselMobileTransitionRef,
    from: { transform: 'translate3d(100%,0,0)' },
    enter: { transform: 'translate3d(0%,0,0)' },
    leave: { transform: 'translate3d(100%,0,0)' }
  });
  const carouselTransition = screenSize < 800 ? carouselMobileTransition : carouselDesktopTransition;

  let transitionArray = [];

  if (show) {
    if (screenSize > 800) {
      transitionArray = [fullScreenContainerRef, carouselDesktopTransitionRef]
    } else {
      transitionArray = [carouselMobileTransitionRef]
    };
  } else {
    if (screenSize > 800) {
      transitionArray = [carouselDesktopTransitionRef, fullScreenContainerRef]
    } else {
      transitionArray = [carouselMobileTransitionRef]
    };
  };

  function close() {
    if (screenSize < 800) {
      document.body.classList.remove(GalleryStyles.fixed);
      window.scrollTo(0, position);
    };
    setShow(false);
  };

  useChain(transitionArray, screenSize > 800 ? [0, 0.2] : [0]);

  return (
    <ConditionalWrapper
      condition={screenSize > 800}
      wrapper={children => <FullScreenBackground show={show} fullScreenRef={fullScreenContainerRef}>{children}</FullScreenBackground>}
      >
      {carouselTransition.map(({ item, key, props }) =>
        item && <animated.div key={key} style={props} className={GalleryStyles.pictureContainer}>
            <div className={GalleryStyles.subContainer}>
              <div className={GalleryStyles.backgroundContainer} style={{height: screenSize > 800 ? height : '300px'}}/>
              <div className={GalleryStyles.number}>{index + 1} / {project.array.length}</div>
              <div onClick={close} className={GalleryStyles.close}>x</div>
              <div className={GalleryStyles.carouselContainer}>
                <LongCarousel activeColor={'#ff9f00'} normalColor={'#444'} dots={true} noRow={true} returnIndex={setIndex}>
                  {project.array.map((src, i) => {
                    return (
                      <div key={i} className={GalleryStyles.imageSubContainer}>
                        <div 
                          className={GalleryStyles.imageContainer} 
                          style={{
                            backgroundImage: `url(${src})`, 
                            height: screenSize > 800 ? height : '300px'
                          }} 
                          />
                      </div>
                    );
                  })}
                </LongCarousel>
              </div>
              <div className={GalleryStyles.bottomContainer}>
                <div className={GalleryStyles.heading}>{project.job}</div>
                <div className={GalleryStyles.line}></div>
                <div className={GalleryStyles.headingBottom}>{project.car}</div>
              </div>
              {/* <Link to={'/work'} className={GalleryStyles.link}>View more projects</Link>  */}
            </div>
        </animated.div>
      )}
    </ConditionalWrapper>
  );
};

function SmallSlideShow () {
  const [index, setIndex] = useState(0);
  const [intervalMethod, setIntervalMethod] = useState(null);
  const containerTransition = useTransition(slides[index], item => item.id, {
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses
  });

  useEffect(() => {
    setIntervalMethod(setInterval(() => setIndex(state => (state + 1) % 3), 4000));
  }, []);
  
  useEffect(() => {
    return () => {
      if (intervalMethod) {
        clearInterval(intervalMethod);
      };
    };
  }, [intervalMethod]);

  return containerTransition.map(({ item, props, key }) => (
      <animated.div
        key={key}
        className={Styles.slideShow}
        style={{
          ...props,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6),
            rgba(0, 0, 0, 0.6)), 
            url(${item.url})`
        }}
      >
        <div className={Styles.bold}>See more projects we've done.</div>
        <Link to='/work' className={Styles.link}>Check out our work page</Link>
      </animated.div>
  ))
};

export default function OurWork() {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState(0);
  const [project, setProject] = useState({});
  const [height, setHeight] = useState(0);
  const container = useRef();
  const screenSize = useWindowResize();

  useEffect(() => {
    if (document.body.classList.contains(GalleryStyles.fixed)) {
      document.body.classList.remove(GalleryStyles.fixed);
    };
  }, [])

  useEffect(() => {
    if (container.current !== null) {
      setHeight(container.current.offsetHeight);
    };
  }, [container.current])

  function openPictures(project) {
    if (screenSize < 800) {
      const scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setPosition(scrollTop);
      setTimeout(() => document.body.classList.add(GalleryStyles.fixed), 475)
    };
    setShow(true);
    setProject(project);
  };

  return (
    <div className={Styles.container}>
      <Gallery 
        setShow={setShow}
        project={project} 
        screenSize={screenSize} 
        show={show}
        position={position}
      />
      <div className={Styles.subContainer}>
        <div className={Styles.heading}>Our Recent Work</div>
        <div className={Styles.line}></div>
        <div className={Styles.containerForImages}>
          <LongCarousel itemWidth={450}>
            {data.map((item, i) => {
              return (
                <div key={i} ref={container}>
                  <div className={Styles.imageContainer}>
                    <div className={Styles.imageBackground} style={{backgroundImage: `url(${item.img})` }} />
                    <div className={Styles.imageSubContainer}>
                      <h1 className={Styles.carHeading}>{item.job}</h1>
                      <div className={Styles.car}>{item.car}</div>
                      <div className={Styles.galleryContainer} onClick={() => openPictures(item)}>
                        <div className={Styles.gallery}>View project gallery</div>
                        <FontAwesomeIcon icon={faImages} className={Styles.rightIcon}/>
                      </div>
                    </div>           
                  </div>
              </div>
              );
            })}
            <div style={{height, position: 'relative'}}>
              <SmallSlideShow />
            </div>
          </LongCarousel>
        </div>
      </div>
    </div>
  );
};