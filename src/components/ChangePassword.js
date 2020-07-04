import React, {useState, useEffect, useContext} from 'react';
import { ConfigContext } from '../routes';
import AdminWrapper from './AdminWrapper';
import queryString from 'query-string';
import LoadingButton from './LoadingButton';
import Error from './Error.js';
import Input from './Input';
import Styles from 'styles/ChangeEmail.css';
import FormStyles from 'styles/AdminForms.css';

export default function ChangeEmail () {

  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const { url, token } = useContext(ConfigContext);

  function changeCurrentPassword(e) {
    setCurrentPassword(e.target.value);
  };

  function changePassword(e) {
    setPassword(e.target.value);
  };

  function changePassword2(e) {
    setPassword2(e.target.value);
  };

  function sendToServer() {
    if (loading) return;
    setError('');
    setResponse('');
    if (password === '' || password2 === '' || currentPassword === '') {
      setError('Some inputs are empty, please make sure all inputs are filled out.');
      return;
    };
    if (password !== password2) {
      setError('Password do not match please try again.');
      return;
    };
    setLoading(true);
    fetch(url + '/api/changepassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        token,
        currentPassword
      })
    }).then(response => response.json()).then(response => {
      setLoading(false);
      if (response.error) {
        setError(response.message);
        return;
      };
      setResponse(response.message);
      setPassword('');
      setPassword2('');
      setCurrentPassword('');
    }).catch(err => {
      setLoading(false);
      setError(err.message)
    });
  };

  return (
    <AdminWrapper heading={'Update Password'} backButton='/adminPanel'>
      <div className={Styles.container}>
        {error && <Error error={error} />}
        {response && <div className={Styles.response}>{response}</div>}
        <Input label={'Current Password'} value={currentPassword} onChange={changeCurrentPassword} type={'password'} />
        <Input label={'New Password'} value={password} onChange={changePassword} type={'password'}/>
        <Input label={'Repeat New Password'} value={password2} onChange={changePassword2} type={'password'}/>
        <LoadingButton title='Update password' onClick={sendToServer} loading={loading}/>
      </div>
    </AdminWrapper>
  );
};