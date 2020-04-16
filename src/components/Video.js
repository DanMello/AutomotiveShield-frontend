import React, {useState, useRef, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { animated, useSpring } from 'react-spring';
import Styles from 'styles/Video.css';

export default function Video ({tempUrl, item, index, i}) {

  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [hide, setHide] = useState(false);
  const [timeOut, setTimeOutMethod] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const videoRef = useRef(null);
  const props = useSpring({
    opacity: hide ? 0 : 1
  });

  useEffect(() => {
    const video = videoRef.current;
    if (timeOut) clearTimeout(timeOut);
    if (i !== index) {
      video.pause();
      video.currentTime = 0;
      setMuted(true);
      setPlaying(false);
      setHide(false);
    };
  }, [index]);

  function videoClicked() {
    if (timeOut) clearTimeout(timeOut);
    const video = videoRef.current;
    if (!video.paused) {
      setHide(false);
      setTimeOutMethod(setTimeout(() => {
        setHide(true);
      }, 2000));
    }
  };

  function toggleVideo() {
    if (timeOut) clearTimeout(timeOut);
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setPlaying(true);
      setTimeOutMethod(setTimeout(() => {
        setHide(true);
      }, 2000));
    } else {
      video.pause();
      setPlaying(false);
      setHide(false);
    };
  };

  function toggleMuted() {
    setMuted(prevState => !prevState);
  };

  function timeUpdate() {
    const video = videoRef.current;
    const timeLeft = video.duration - video.currentTime;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = Math.ceil(timeLeft % 60);
    const time = minutes + 'm ' + (seconds < 10 ? '0' + seconds : seconds) + 's';
    setTimeLeft(time);
  };

  console.log(timeLeft)

  return (
    <div>
      <div 
        className={Styles.videoContainer}
        style={{
          backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0.6)),
          url(${tempUrl + item.thumbnailName})
          `
        }}
      >
        {timeLeft && 
          <animated.div style={{...props}} className={Styles.timeContainer}>
            {timeLeft}
          </animated.div>
        }
        {playing ?
          <animated.div style={{...props}} className={Styles.buttonContainer} onClick={toggleVideo}>
            <FontAwesomeIcon icon={faPause} className={Styles.playButton}/>
          </animated.div>
          :
          <div className={Styles.buttonContainer} onClick={toggleVideo}>
            <FontAwesomeIcon icon={faPlay} className={Styles.playButton}/>
          </div>
        }
        {muted ?
          <animated.div style={{...props}} className={Styles.muteButtonContainer} onClick={toggleMuted}>
            <FontAwesomeIcon icon={faVolumeMute} className={Styles.playButton}/>
          </animated.div>
          :
          <animated.div style={{...props}} className={Styles.muteButtonContainer} onClick={toggleMuted}>
            <FontAwesomeIcon icon={faVolumeUp} className={Styles.playButton}/>
          </animated.div>
        }
        <video
          ref={videoRef}
          onClick={videoClicked}
          className={Styles.video}
          poster={tempUrl + item.thumbnailName}
          onTimeUpdate={timeUpdate}
          playsInline={true}
          muted={muted}
          loop={true}
        >
          <source 
            src={tempUrl + item.filename} 
            type={item.mimetype} 
          />
        </video>
      </div>
    </div>
  );
};