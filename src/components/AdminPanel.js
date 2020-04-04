import React, { useEffect, useContext, useState } from 'react';
import { ConfigContext } from '../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Loader from './Loader';
import Styles from 'styles/AdminPanel.css';

export default function AdminPanel ({history, removeToken}) {

  const { url, token } = useContext(ConfigContext);

  useEffect(() => {
    if (!token) history.push(`/admin?error=You are not logged in.`);
  }, []);

  function logOut () {
    fetch(url + '/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: token})
    }).then(response => response.json()).then(response => {
      removeToken();
      if (response.error) {
        history.push(`/admin?error=${response.message}`)
        return;
      };
      history.push(`/admin?response=${response.message}`)
    }).catch(err => {
      removeToken();
      history.push(`/admin?error=${err.message}`)
    });
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.subContainer}>
        <div className={Styles.heading}>Automotive Shield admin console.</div>
        <div className={Styles.button} onClick={logOut}>Log Out</div>
      </div>
    </div>
  );
};