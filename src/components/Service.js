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

export default function ChangeServices ({history}) {

  const [error, setError] = useState('');
  const [service, setService] = useState('');
  const [newService, setNewService] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const { url, token } = useContext(ConfigContext);

  useEffect(() => {
    const values = queryString.parse(location.search)
    setService(values.type);
  }, []);

  function changeService(e) {
    setNewService(e.target.value);
  }

  function sendToServer() {
    if (loading) return;
    setError('');
    setResponse('');
    if (newService === '') {
      setError('Updated service cannot be empty.');
      return;
    };
    setLoading(true);
    fetch(url + '/api/updateservice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        newService: newService,
        service: service,
        token
      })
    }).then(response => response.json()).then(response => {
      setLoading(false);
      if (response.error) {
        setError(response.message);
        return;
      };
      window.history.pushState(null, null, `${window.location.pathname}?type=${response.newService}`);
      setService(response.newService);
      setNewService('');
      setResponse(response.message);
    }).catch(err => {
      setLoading(false);
      setError(err.message)
    });
  };

  function deleteService() {
    if (loading) return;
    setError('');
    setResponse('');
    setLoading(true);
    fetch(url + '/api/deleteservice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service: service,
        token
      })
    }).then(response => response.json()).then(response => {
      setLoading(false);
      if (response.error) {
        setError(response.message);
        return;
      };
      history.push(`/postresponse?message=${response.message}&link=/updateservices&heading=update services`);
    }).catch(err => {
      setLoading(false);
      setError(err.message)
    });
  };

  return (
    <AdminWrapper 
      heading={'Edit Service'} 
      backButton='/updateservices'
      method={deleteService} 
      methodLabel={'Delete service'}
      color={'orangered'}
      fontColor={'white'}
      >
      <div className={Styles.container}>
        {error && <Error error={error} />}
        <div className={Styles.response}>{response}</div>
        <div className={Styles.currentEmailContainer}>
          <div className={Styles.currentEmailLabel}>Current Service: </div>
          <div className={Styles.currentEmail}>{service}</div>
        </div>
        <Input label={'Updated Service'} value={newService} onChange={changeService} type={'text'}/>
        <LoadingButton title='Update Service' onClick={sendToServer} loading={loading}/>
      </div>
    </AdminWrapper>
  );
};