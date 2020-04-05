import React, { useState, useContext, useEffect } from 'react';
import { ConfigContext } from '../routes';
import Loader from './Loader';
import Styles from 'styles/Admin.css';

export default function Admin ({tokenMessage, createToken}) {
  const [login, setLogin] = useState({
    email: '',
    password: ''
  });
  const [tokenMessageObj, setTokenMessageObj] = useState(tokenMessage);
  const [activeInput, setActiveInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const { url } = useContext(ConfigContext);

  function focus(e) {
    setActiveInput(e.target.id);
  };

  function blur(e) {
    setActiveInput('');
  };

  function changeLogin(e) {
    setLogin({
      ...login,
      [e.target.id]: e.target.value
    });
  };

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  function submit() {
    if (loading) return;
    setError('');
    setTokenMessageObj({});
    const emptyItems = Object.keys(login).every(item => login[item] !== '');
    if (!emptyItems) {
      setError('Some inputs are empty, please make sure all inputs are filled out.');
      return;
    };
    if (!validateEmail(login.email)) {
      setError('The email you entered seems to be invalid, please double check and try again');
      return;
    };
    setLoading(true);
    fetch(url + '/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    }).then(response => response.json()).then(response => {
      setLoading(false);
      if (response.error) {
        setError(response.message)
        return;
      };
      createToken(response.token);
    }).catch(err => {
      setLoading(false);
      setError(err.message)
    });
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.subContainer}>
        {(tokenMessageObj.error || error) && <div className={Styles.error}>{tokenMessageObj.message || error}</div>}
        {((tokenMessageObj.message && !tokenMessageObj.error) || response) && <div className={Styles.response}>{tokenMessageObj.message || response}</div>}
        <div className={Styles.innerContainer}>
          <div className={Styles.header}>Admin login</div>
          <div>
            <input 
              id={'email'}
              className={activeInput === 'email' ? [Styles.input, Styles.focus].join(' ') : Styles.input}
              placeholder={'Email'} 
              type={'email'}
              onFocus={focus}
              onBlur={blur}
              value={login.email}
              onChange={changeLogin}
            />
            <input 
              id={'password'}
              className={activeInput === 'password' ? [Styles.input, Styles.focus].join(' ') : Styles.input}
              placeholder={'Password'} 
              type={'password'}
              onFocus={focus}
              value={login.password}
              onBlur={blur}
              onChange={changeLogin}
            />
          </div>
          <div onClick={submit} className={Styles.button}>
            <div>Login</div>
            {loading && <Loader width='25px' height='25px' thickness='2px'></Loader>}
          </div>
        </div>
      </div>
    </div>
  );
};