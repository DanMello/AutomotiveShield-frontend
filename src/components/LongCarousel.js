import React, { useRef, useState, useEffect } from 'react';
import clamp from 'lodash-es/clamp';
import { useDrag } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Styles from 'styles/LongCarousel.css';

export default function LongCarousel ({children, itemWidth, dots, activeColor, normalColor, noRow, time, returnIndex}) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [currentInterval, setIntervalMethod] = useState(null);
  const [currentTimeOut, setTimeOutMethod] = useState(null);
  const [carouselButtonIndex, setCarouselButtonIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [rows, setRows] = useState(noRow ? 1 : 3);
  const elRefs = useRef([]);
  const [{ x, x2}, setSpring] = useSpring(() => ({ x: 0, x2: 0}));
  const childrenReduced = children.reduce((acc, cur) => {
    const array = acc || [];
    if (cur.length > 0) {
      cur.forEach(item => {
        array.push(item);
      });
    } else if (cur.type === 'div') {
      array.push(cur);
    }
    return array;
  }, []);
  const childrenLength = childrenReduced.length;
  const bind = useDrag(({ down, movement: [mx], direction: [xDir], cancel}) => {
    if (down) {
      if (currentInterval && time) {
        clearInterval(currentInterval)
      };
    } else if (time) {
      setIntervalMethod(setInterval(() => setIndex(state => (state + 1) % childrenLength), time));
    }
    if (down && Math.abs(mx) > width / 2) {
      const currentIndex = clamp(index + (xDir > 0 ? -1 : 1), 0, childrenLength - 1);
      if ((currentIndex - 1) === childrenLength - rows) {
        cancel();
        return;
      };
      setIndex(currentIndex);
      setCarouselButtonIndex(currentIndex);
      setSpring({x2: -Math.abs(currentIndex * 20)});
      cancel();
    };
    setSpring({x: -Math.abs(index * width) + (down ? mx : 0)})
  });

  useEffect(() => {
    if (elRefs.current !== null) {
      setWidth(elRefs.current[0].offsetWidth);
    };
  });

  useEffect(() => {
    if (time) {
      setIntervalMethod(setInterval(() => {
        setIndex(state => (state + 1) % childrenLength)
      }, time));
    };
  }, []);

  useEffect(() => {
    return () => {
      if (currentInterval) {
        clearInterval(currentInterval);
      };
      if (currentTimeOut) {
        clearTimeout(currentTimeOut);
      };
    };
  }, [currentInterval, currentTimeOut]);

  useEffect(() => {
    changeRows();
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
  }, [windowWidth]);

  useEffect(() => {
    setSpring({x: -Math.abs(index * width), x2: -Math.abs(index * 20)});
    setCarouselButtonIndex(index);
    if (returnIndex) {
      returnIndex(index);
    };
  }, [index]);

  function changeRows() {
    if (noRow) return;
    if (window.innerWidth > 1120) {
      setRows(3);
    } else if (window.innerWidth < 1120 && window.innerWidth > 800) {
      setRows(2);
    } else {
      setRows(1);
    };
  };

  function handleResize() {
    if (windowWidth !== window.innerWidth) {
      setWindowWidth(window.innerWidth);
      changeRows();
      setIndex(0);
      setCarouselButtonIndex(0);
      if (currentTimeOut) clearTimeout(currentTimeOut);
      if (currentInterval) clearInterval(currentInterval);
      if (time) {
        setTimeOutMethod(setTimeout(() => {
          setIntervalMethod(setInterval(() => setIndex(state => (state + 1) % childrenLength), time));
        }, 100));
      };
    };
  };

  function increment() {
    if (index === childrenLength - rows) {
      setIndex(0);
      return;
    };
    setIndex(state => state + 1);
  };

  function decrement() {
    if (index === 0) {
      setIndex(childrenLength - rows);
      return;
    };
    setIndex(state => state - 1);
  };

  return (
    <div style={{width: "100%"}}>
      <div className={Styles.outSideContainer}>
        {!dots && <FontAwesomeIcon icon={faChevronLeft} className={Styles.arrowLeft} onClick={decrement} />}
        <div style={{maxWidth: itemWidth * rows + 'px'}} className={Styles.container} {...bind()}>
          <animated.div style={{x}} className={Styles.animatedContainer}>
            {childrenReduced.map((item, i) => {
              return <div key={i} style={{flexBasis: (100 / rows) + '%'}} className={Styles.flexContainer} ref={el => elRefs.current[i] = el}>
                {item}
              </div>
            })}
          </animated.div>
        </div>
        {!dots && <FontAwesomeIcon icon={faChevronRight} className={Styles.arrowRight} onClick={increment}/>}
      </div>
      {dots &&
        <div className={Styles.carouselSubContainer}>
          <div className={Styles.carouselButtonContainer}>
            {children.map((_, i) => {
              return (
                <animated.div
                  key={i} 
                  className={Styles.carouselButton} 
                  style={{
                    background: carouselButtonIndex === i ? activeColor : normalColor,
                    scale: index !== i ? .5 : 1,
                    x: childrenLength > 4 && x2
                  }}
                  >
                </animated.div>
              );
            })}
          </div>
        </div>
      }
    </div>
  );
};