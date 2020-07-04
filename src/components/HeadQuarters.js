import React, { useState, useContext } from 'react';
import {ConfigContext} from '../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt, faBuilding, faChevronDown,faEnvelope } from '@fortawesome/free-solid-svg-icons';
import useWindowResize from '../hooks/useWindowSize';
import GoogleMap from './GoogleMap';
import ConditionalWrapper from './ConditionalWrapper';
import Styles from 'styles/HeadQuarters.css';
import LongCarousel from './LongCarousel';

export default function HeadQuarters({theme}) {
  const [location, setLocation] = useState('Florida');
  const { isMobile } = useContext(ConfigContext);
  const screenSize = useWindowResize();
  function changeToRockland() {
    setLocation('Rockland');
  };

  function changeToFlorida() {
    setLocation('Florida');
  };

  return (
    <div id="contact">
      <div className={Styles.container} style={theme === 'light' ? {background:'#f1f1f1'} : {background: '#131921'}}>
        <div className={Styles.subContainer}>
          <div className={Styles.heading} style={theme === 'light' ? {color: '#444'} : {color: 'white'}}>Headquarters</div>
          <div className={Styles.line}></div>
          <div className={Styles.anotherSubContainer}>
            <div className={Styles.locationContainer}>
              <div>
                <div className={Styles.heading2}>Florida</div>
                <div className={Styles.line2}></div>
                <div className={Styles.listContainer}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className={Styles.location} />
                  <div className={Styles.address}>21500 Biscayne Blvd 8th floor, Aventura, FL 33180</div>
                </div>
                <div className={Styles.listContainer}>
                  <FontAwesomeIcon icon={faBuilding} className={Styles.location} />
                  <div className={Styles.address}>8TH Floor at the Optima Plaza Building Garage</div>
                </div>
                <div className={Styles.listContainer}>
                  <FontAwesomeIcon icon={faPhoneAlt} className={Styles.location} />
                  <a href="tel:3059270006" className={Styles.phone}>305-927-0006</a>
                </div>
                <div className={Styles.listContainer}>
                  <FontAwesomeIcon icon={faEnvelope} className={Styles.location} />
                  <a href="mailto: clearbraflorida@gmail.com" className={Styles.phone}>clearbraflorida@gmail.com</a>
                </div>
              </div>
              {/* <div onClick={changeToFlorida} className={Styles.button}>
                <div>Show this location on map</div>
                <FontAwesomeIcon icon={faChevronDown} className={Styles.iconDown}/>
              </div> */}
            </div>
            <GoogleMap location={location}/>
          </div>
        </div>
        <div className={Styles.seeMore}>
          Send us a message below
        </div>
        {/* <div>Contact us</div> */}
      </div>
    </div>
  );
};

          /* <ConditionalWrapper
              condition={screenSize < 800}
              wrapper={children => <LongCarousel activeColor={'white'} normalColor={'#444'} dots={true} noRow={true} time={5000}>{children}</LongCarousel>}
              >
              <div className={Styles.otherContainer}>
                <div className={Styles.locationContainer}>
                  <div>
                    <div className={Styles.heading2}>Rockland</div>
                    <div className={Styles.line2}></div>
                    <div className={Styles.listContainer}>
                      <FontAwesomeIcon icon={faMapMarkerAlt} className={Styles.location} />
                      <div className={Styles.address}>611 Summer St, Rockland, MA 02370</div>
                    </div>
                    <div className={Styles.listContainer}>
                      <FontAwesomeIcon icon={faPhoneAlt} className={Styles.location} />
                      <a href="tel:3397880346" className={Styles.phone}>339-788-0346</a>
                    </div>
                  </div>
                  <div onClick={changeToRockland} className={location === 'Rockland' ? [Styles.button, Styles.active].join(" ") : Styles.button}>
                    <div>Show this location on map</div>
                      <FontAwesomeIcon icon={faChevronDown} className={Styles.iconDown}/>
                    </div>
                </div>
              </div> 
            </ConditionalWrapper> */