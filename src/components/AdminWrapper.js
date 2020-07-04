import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import Styles from 'styles/AdminWrapper.css';

export default function AdminWrapper ({children, heading, backButton, method, methodLabel, color, fontColor}) {
  return (
    <div className={Styles.container}>
      <div className={Styles.subContainer}>
        <div className={Styles.headerContainer}>
          <Link className={Styles.iconContainer} to={backButton}>
            <FontAwesomeIcon icon={faChevronLeft} className={Styles.icon} />
          </Link>
          <div className={Styles.header}>{heading}</div>
          {method ? 
            <div 
              onClick={method} 
              className={Styles.button} 
              style={{"backgroundColor": color, "color": fontColor}}
              >
              <FontAwesomeIcon icon={faTrash} className={Styles.trashIcon} />
            </div> 
            : 
            <div>
            </div>
          }
        </div>
        <div className={Styles.bottomContainer}>
          {children}
        </div>
      </div>
    </div>
  );
};