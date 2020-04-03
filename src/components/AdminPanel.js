import React, { useEffect, useContext, useState } from 'react';
import { ConfigContext } from '../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Loader from './Loader';
import Styles from 'styles/AdminPanel.css';

export default function AdminPanel ({history}) {

  const [loader, setLoader] = useState(false);
  const [token, setToken] = useState('');
  const { url } = useContext(ConfigContext);

  useEffect(() => {
    const currentToken = localStorage.getItem('token');

    setToken(currentToken)
    setLoader(true);
    fetch(url + '/api/checkToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: currentToken})
    }).then(response => response.json()).then(response => {
      if (response.error) {
        localStorage.removeItem('token');
        history.push(`/admin?error=${response.message}`)
        return;
      };
      setLoader(false);
    }).catch(err => {
      localStorage.removeItem('token');
      history.push(`/admin?error=${err.message}`)
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
      localStorage.removeItem('token');
      if (response.error) {
        history.push(`/admin?error=${response.message}`)
        return;
      };
      history.push(`/admin?response=${response.message}`)
    }).catch(err => {
      localStorage.removeItem('token');
      history.push(`/admin?error=${err.message}`)
    });
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.subContainer}>
        <div>
          {loader ? 
            <div className={Styles.loaderContainer}>
              <div className={Styles.credentials}>Validating Credentials</div>
              <Loader width={'25px'} height={'25px'} thickness={'2px'} marginLeft={'10px'}/>
            </div> 
            :
            <div className={Styles.loaderContainer}>
              <div className={Styles.credentials}>Credentials Validated</div>
              <FontAwesomeIcon icon={faCheck} className={Styles.icon}/>
            </div>
          }
        </div>
        <div className={Styles.heading}>Automotive Shield admin console.</div>
        <div className={Styles.button} onClick={logOut}>Log Out</div>
      </div>
    </div>
  );
};