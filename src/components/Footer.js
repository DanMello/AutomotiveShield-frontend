import React from 'react';
import Styles from 'styles/Footer.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook,faInstagram, faYelp } from "@fortawesome/free-brands-svg-icons"
// import { faCloud, faInstagram } from '@fortawesome/free-solid-svg-icons';

export default function Footer ({footerColor}) {
  return (
    <div className={Styles.container} style={{background: footerColor}}>
      <div className={Styles.subContainer}>
        <div className={Styles.mello}>
          <div className={Styles.powered}>Powered by</div>
          <a href='https://www.mellocloud.com' className={Styles.melloCloud}>mello cloud</a>
        </div>
        <div className={Styles.bottomContainer}>
          <div className={Styles.socialIcons}>
            <a href='https://www.instagram.com/clearbraflorida'><FontAwesomeIcon icon={faInstagram} className={Styles.icon}/></a>
            <a href='https://www.facebook.com/clearbraflorida'><FontAwesomeIcon icon={faFacebook} style={{marginLeft: "15px"}} className={Styles.icon}/></a>
            <a href='https://www.yelp.com/biz/automotive-shield-clear-bra-llc-aventura-2'><FontAwesomeIcon icon={faYelp} style={{marginLeft: "15px"}} className={Styles.icon}/></a>
          </div>
          <div className={Styles.shield}>Automotive Shield &copy; 2020</div>
        </div>
      </div>
    </div>
  );
};