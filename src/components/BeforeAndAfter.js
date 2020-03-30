import React from 'react';
import Styles from 'styles/BeforeAndAfter.css';

export default function BeforeAndAfter() {
  return (
    <div className={Styles.container}>
      <div className={Styles.subContainer}>
        <div className={Styles.heading}>See what paint protection</div>
        <div className={Styles.heading}>can do for you.</div>
        <div className={Styles.line}></div>
      </div>
      <div className={Styles.anotherContainer}>
        <div className={Styles.anotherSubContainer}>
          <video className={Styles.video} poster="assets/movieframe.jpg" controls>
            <source src="assets/xpelvideo.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
          <div className={Styles.statement}>XPEL Paint Protection Film is the leading standard in the paint protection industry and we are certified installers with over fifteen years of experience working on dozens of high end car brands.</div>
          <div className={Styles.work}>See some more benefits below</div>
        </div>
      </div>
    </div>
  );
};