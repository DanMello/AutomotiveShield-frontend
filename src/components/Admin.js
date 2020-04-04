import React, { useState, useContext, useEffect } from 'react';
import { ConfigContext } from '../routes';
import queryString from 'query-string' 
import Styles from 'styles/Admin.css';

export default function Admin ({history, location, createToken}) {
  const [login, setLogin] = useState({
    email: '',
    password: ''
  });
  const [activeInput, setActiveInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');
  const { url, token } = useContext(ConfigContext);

  useEffect(() => {
    const values = queryString.parse(location.search);

    if (token) {
      history.push(`/adminPanel`);
      return;
    };

    if (values.error) {
      setError(values.error);
      window.history.pushState(null, null, window.location.pathname);
    };

    if (values.response) {
      setResponse(values.response);
      window.history.pushState(null, null, window.location.pathname);
    };
  }, []);

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
    setError('');
    const emptyItems = Object.keys(login).every(item => login[item] !== '');
    if (!emptyItems) {
      setError('Some inputs are empty, please make sure all inputs are filled out.');
      return;
    };
    if (!validateEmail(login.email)) {
      setError('The email you entered seems to be invalid, please double check and try again');
      return;
    };
    fetch(url + '/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    }).then(response => response.json()).then(response => {
      if (response.error) {
        throw new Error(response.message)
      };
      setResponse(response.message);
      createToken(response.token)
      setTimeout(() => history.push('/adminPanel'), 500);
    }).catch(err => {
      setError(err.message)
    });
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.subContainer}>
        <div className={Styles.error}>{error}</div>
        <div className={Styles.response}>{response}</div>
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
            Login
          </div>
        </div>
      </div>
    </div>
  );
};