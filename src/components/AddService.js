import React, {useState, useEffect, useContext} from 'react';
import { ConfigContext } from '../routes';
import AdminWrapper from './AdminWrapper';
import queryString from 'query-string';
import LoadingButton from './LoadingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Error from './Error.js';
import Input from './Input';
import Styles from 'styles/ChangeServices.css';
import { Link } from 'react-router-dom';

export default function AddService () {

  const [error, setError] = useState('');
  const [newService, setNewService] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const { url, token } = useContext(ConfigContext);


  function changeService(e) {
    setNewService(e.target.value);
  };

  function sendToServer() {
    if (loading) return;
    setError('');
    setResponse('');
    if (newService === '') {
      setError('New service cannot be empty.');
      return;
    };
    setLoading(true);
    fetch(url + '/api/addnewservice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        newService: newService,
        token
      })
    }).then(response => response.json()).then(response => {
      setLoading(false);
      if (response.error) {
        setError(response.message);
        return;
      };
      setNewService('');
      setResponse(response.message);
    }).catch(err => {
      setLoading(false);
      setError(err.message)
    });
  };

  return (
    <AdminWrapper heading={'Add Service'} backButton='/updateservices'>
      <div className={Styles.container}>
        {error && <Error error={error} />}
        {response && <div className={Styles.response}>{response}</div>}
        <Input label={'New Service'} value={newService} onChange={changeService} type={'text'}/>
        <LoadingButton title='Add New Service' onClick={sendToServer} loading={loading}/>
      </div>
    </AdminWrapper>
  );
};