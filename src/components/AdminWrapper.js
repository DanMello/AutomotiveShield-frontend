import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Styles from 'styles/AdminWrapper.css';

export default function AdminWrapper ({children, heading, backButton}) {
  return (
    <div className={Styles.container}>
      <div className={Styles.subContainer}>
        <div className={Styles.headerContainer}>
          <Link className={Styles.iconContainer} to={backButton}>
            <FontAwesomeIcon icon={faChevronLeft} className={Styles.icon} />
          </Link>
          <div className={Styles.header}>{heading}</div>
          <div></div>
        </div>
        <div className={Styles.bottomContainer}>
          {children}
        </div>
      </div>
    </div>
  );
};