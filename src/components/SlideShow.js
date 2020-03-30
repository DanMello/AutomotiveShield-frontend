import React, { useState, useEffect} from 'react';
import { animated, useTransition, config} from 'react-spring';
import Styles from 'styles/SlideShow.css';

export default function SlideShow({obj}) {
  const [index, setIndex] = useState(0);
  const [intervalMethod, setIntervalMethod] = useState(null);
  const containerTransition = useTransition(obj.slides[index], item => item.id, {
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.molasses
  });
  
  useEffect(() => {
    setIntervalMethod(setInterval(() => setIndex(state => (state + 1) % 4), 4000));
    return () => {
      if (intervalMethod) {
        clearInterval(intervalMethod);
      };
    };
  }, []);

  return (
    <div className={Styles.mainContainer}>
      {containerTransition.map(({ item, props, key }) => (
        <animated.div
          key={key}
          className={Styles.container}
          style={{
            ...props,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6),
              rgba(0, 0, 0, 0.6)), 
              url(${item.url})`
          }}
        >
          <div className={Styles.insideContainer}>
            <div className={Styles.heading}>{obj.heading}</div>
            <div className={Styles.line}></div>
            <div className={Styles.intro}>{obj.description}</div>
            <div className={Styles.bottomStatement}>{obj.bottomStatement}</div>
          </div>
        </animated.div>
      ))}
    </div>
  );
};