import React, { useEffect, useContext, useState } from 'react';
import { ConfigContext } from '../routes';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCog, faEnvelope, faCar, faUser } from '@fortawesome/free-solid-svg-icons';
import Loader from './Loader';
import Error from './Error';
import Styles from 'styles/AdminPanel.css';

function SettingsArray ({array}) {
  return array.map((item, i) => {
    return (
      <Link key={i} to={item.link} className={Styles.inputContainer}>
        <FontAwesomeIcon icon={item.icon} className={Styles.firstIcon}/>
        <label className={Styles.label}>{item.label}:</label>
        <div className={Styles.input}>{item.input}</div>
        <FontAwesomeIcon icon={faChevronRight} className={Styles.icon}/>
      </Link>
    );
  })
};

export default function AdminPanel ({removeToken}) {

  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const { url, token } = useContext(ConfigContext);

  const array = [
    {
      label: 'Services',
      input: user.services && user.services.length + ' different services.',
      link: `/updateservices`,
      icon: faCar
    },
    {
      label: 'Email',
      input: user.email,
      link: `/changeemail?email=${user.email}`,
      icon: faEnvelope
    },
    {
      label: 'Password',
      input: '***********',
      link: `/changepassword`,
      icon: faUser
    }, 
  ];

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
      console.log(response)
      setUser(response.user);
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
          <SettingsArray array={array} />
          <div className={Styles.button} onClick={logOut}>Log Out</div>
        </div>
      </div>
    </div>
  );
};