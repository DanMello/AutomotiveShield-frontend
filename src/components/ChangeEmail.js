import React, {useState, useEffect, useContext} from 'react';
import { ConfigContext } from '../routes';
import AdminWrapper from './AdminWrapper';
import queryString from 'query-string';
import LoadingButton from './LoadingButton';
import Error from './Error.js';
import Input from './Input';
import Styles from 'styles/ChangeEmail.css';
import FormStyles from 'styles/AdminForms.css';

export default function ChangeEmail ({location, createToken}) {

  const [currentEmail, setCurrentEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const { url, token } = useContext(ConfigContext);

  useEffect(() => {
    const values = queryString.parse(location.search)
    setCurrentEmail(values.email);
  }, []);

  function changeEmail(e) {
    setEmail(e.target.value);
  };

  function changePassword(e) {
    setPassword(e.target.value);
  };

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  function sendToServer() {
    if (loading) return;
    setError('');
    setResponse('');
    if (email === '' || password === '' ) {
      setError('Some inputs are empty, please make sure all inputs are filled out.');
      return;
    };
    if (!validateEmail(email)) {
      setError('The email you entered seems to be invalid, please double check and try again');
      return;
    };
    if (email === currentEmail) {
      setError('You must enter a different email than your current one.');
      return;
    };

    setLoading(true);
    fetch(url + '/api/updateemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        token
      })
    }).then(response => response.json()).then(response => {
      setLoading(false);
      if (response.error) {
        setError(response.message);
        return;
      };
      window.history.pushState(null, null, `${window.location.pathname}?email=${response.email}`);
      createToken(response.token);
      setCurrentEmail(response.email);
      setResponse(response.message);
      setEmail('');
      setPassword('');
    }).catch(err => {
      setLoading(false);
      setError(err.message)
    });
  };

  return (
    <AdminWrapper heading={'Update Email'} backButton='/adminPanel'>
      {error && <Error error={error} />}
      <div className={Styles.response}>{response}</div>
      <div className={Styles.currentEmailContainer}>
        <div className={Styles.currentEmailLabel}>Current Email</div>
        <div className={Styles.currentEmail}>{currentEmail}</div>
      </div>
      <Input label={'New Email'} value={email} onChange={changeEmail} type={'email'}/>
      <Input label={'Current Password'} value={password} onChange={changePassword} type={'password'}/>
      <LoadingButton title='Update Email' onClick={sendToServer} loading={loading}/>
    </AdminWrapper>
  );
};