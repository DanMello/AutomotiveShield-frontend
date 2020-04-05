import React, { useEffect, useContext, useState } from 'react';
import { ConfigContext } from '../routes';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCog, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Loader from './Loader';
import Error from './Error';
import Styles from 'styles/AdminPanel.css';

export default function AdminPanel ({removeToken}) {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { url, token } = useContext(ConfigContext);

  useEffect(() => {
    fetch(url + '/api/getUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: token})
    }).then(response => response.json()).then(response => {
      if (response.error) {
        removeToken(response.message, true);
      };
      setEmail(response.email);
    }).catch(err => {
      setError(err.message + ' Please refresh.');
    });
  }, []);

  function logOut () {
    fetch(url + '/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: token})
    }).then(response => response.json()).then(response => {
      if (response.error) {
        removeToken(response.message, true);
        return;
      };
      removeToken(response.message);
    }).catch(err => {
      removeToken(err.message, true);
    });
  };

  return (
    <div className={Styles.container}>

      <div className={Styles.subContainer}>
        <div className={Styles.headingContainer}>
          <FontAwesomeIcon icon={faCog} className={Styles.cogIcon}/>
          <div className={Styles.heading}>Settings</div>
        </div>
        <div className={Styles.bottomContainer}>
          {error && <Error error={error} />}
          <div>  
            <Link to={`/changeemail?email=${email}`} className={Styles.inputContainer}>
              <FontAwesomeIcon icon={faEnvelope} className={Styles.firstIcon}/>
              <label className={Styles.label}>Email: </label>
              <div className={Styles.input}>{email}</div>
              <FontAwesomeIcon icon={faChevronRight} className={Styles.icon}/>
            </Link>
          </div>

          <div className={Styles.button} onClick={logOut}>Log Out</div>
        </div>
      </div>
    </div>
  );
};