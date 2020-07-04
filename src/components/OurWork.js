import React, {useEffect, useState, useRef, useContext} from 'react';
import { ConfigContext } from '../routes';
import useWindowResize from '../hooks/useWindowSize';
import LongCarousel from './LongCarousel';
import { Link } from 'react-router-dom';
import {useTransition, animated, useChain, config} from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import Styles from 'styles/OurWork.css';
import PostContainer from './PostContainer';
import Video from './Video';
import ConditionalWrapper from './ConditionalWrapper';
import GalleryStyles from 'styles/Gallery.css';

const height = window.innerHeight / 2 + 'px';

const slides = [
  { id: 0, url: '/assets/smallslide1-min.JPEG' },
  { id: 1, url: '/assets/smallslide2-min.JPEG' },
  { id: 2, url: '/assets/smallslide3-min.JPEG' },
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

function Gallery({setShow, project, screenSize, show, position, url}) {

  const [index, setIndex] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(false);
  
  const fullScreenContainerRef = useRef();

  const videoType = ['video/quicktime', 'video/mp4'];

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
              <div className={GalleryStyles.number}>{index + 1} / {project.uploads.length}</div>
              <div onClick={close} className={GalleryStyles.close}>x</div>
              <div className={GalleryStyles.carouselContainer}>
                <LongCarousel 
                  activeColor={'#ff9f00'} 
                  normalColor={'#444'} 
                  dots={true} 
                  noRow={true} 
                  returnIndex={setIndex}
                  forceUpdate={setForceUpdate}
                  arrowDots={true}
                  >
                  {project.uploads.map((item, i) => {
                    return (
                      <div key={i} className={GalleryStyles.imageSubContainer}>
                        {videoType.includes(item.mimetype) ?
                          <Video
                            url={url + item.publicFilePath} 
                            thumbnailUrl={url + item.publicThumbnailPath} 
                            item={item}
                            index={index}
                            i={i}
                            forceUpdate={forceUpdate}
                            />
                          :
                          <div 
                          className={GalleryStyles.imageContainer} 
                          style={{
                            backgroundImage: `url(${url}${item.publicFilePath})`, 
                            height: screenSize > 800 ? height : '300px'
                          }}
                          />
                        }
                      </div>
                    );
                  })}
                </LongCarousel>
              </div>
              <div className={GalleryStyles.bottomContainer}>
                <div className={GalleryStyles.heading}>{project.service}</div>
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
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');
  const [loadAgain, setLoadAgain] = useState(false);
  const container = useRef();
  const screenSize = useWindowResize();
  const { url, token, env } = useContext(ConfigContext);
  const videoType = ['video/quicktime', 'video/mp4'];
  const userDataUrl = env === 'production' ? '/assets' : url;

  useEffect(() => {
    if (document.body.classList.contains(GalleryStyles.fixed)) {
      document.body.classList.remove(GalleryStyles.fixed);
    };
  }, []);

  useEffect(() => {
    setError('');
    fetch(url + `/api/cars?limit=6`).then(response => response.json())
    .then(response => {
      if (response.error) {
        setError(response.message);
        return;
      };
      setCars(response.cars);
    }).catch(err => {
      setError(err.message);
    });
  }, [loadAgain])

  useEffect(() => {
    if (container.current !== undefined) {
      setHeight(container.current.offsetHeight);
    };
  });

  function loadData() {
    setLoadAgain(prevState => !prevState);
  };

  function openPictures(project) {
    if (screenSize < 800) {
      const scrollTop =  window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setPosition(scrollTop);
      setTimeout(() => document.body.classList.add(GalleryStyles.fixed), 475)
    };
    setShow(true);
    setProject(project);
  };

  console.log(cars)

  return (
    <div className={Styles.container}>
      <Gallery 
        setShow={setShow}
        project={project} 
        screenSize={screenSize} 
        show={show}
        position={position}
        url={userDataUrl}
      />
      <div className={Styles.subContainer}>
        <div className={Styles.heading}>Our Recent Work</div>
        <div className={Styles.line}></div>
        {error && 
        <div className={Styles.errorContainer}>
          <div className={Styles.error}>{error}</div>
          <div className={Styles.buttonRefresh} onClick={loadData}>Click here to try again</div>
        </div>}
        {cars.length > 0 &&
          <div className={Styles.containerForImages}>
            <LongCarousel itemWidth={450}>
              {cars.map((item, i) => {
                const date = new Date(item.date);
                let day = date.getDate().toString();
                let month = date.toLocaleString('default', { month: 'short' });
                let year = date.getFullYear().toString();
                return (
                  <div key={i} ref={container}>
                    <div className={Styles.imageContainer}>
                      <div 
                        className={Styles.imageBackground} 
                        style={{backgroundImage: videoType.includes(item.uploads[item.thumbnailIndex].mimetype) ? `url(${userDataUrl}${item.uploads[item.thumbnailIndex].publicThumbnailPath})` : `url(${userDataUrl}${item.uploads[item.thumbnailIndex].publicFilePath})` }} 
                        />
                      <div className={Styles.imageSubContainer}>
                        <h1 className={Styles.carHeading}>{item.service}</h1>
                        <div className={Styles.car}>{item.car}</div>
                        <div className={Styles.date}>{month + ', ' + day + ' ' + year} </div>
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
        }
      </div>
      <div className={Styles.seeMore}>
        See our headquarters below
      </div>
    </div>
  );
};