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

function ServicesArray({array}) {
  return array.map((item, i) => {
    return (
      <Link to={`/updateservices/service?type=${item}`} key={i} className={Styles.serviceContainer}>
        <div>{item}</div>
        <FontAwesomeIcon icon={faChevronRight} className={Styles.icon}/>
      </Link>
    );
  });
};

export default function ChangeServices () {

  const [error, setError] = useState('');
  const [response, setResponse] = useState('');
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(false);
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
        setError(response.message);
        return;
      };
      setArray(response.user.services);
    }).catch(err => {
      setError(err.message + ' Please refresh.');
    });
  }, []);

  return (
    <AdminWrapper heading={'Update Services'} backButton='/adminPanel' >
      <div className={Styles.container}>
        {error && <Error error={error} />}
        <div className={Styles.response}>{response}</div>
        <div className={Styles.heading}>Current services:</div>
        <div className={Styles.servicesDescription}>Services listed here are shown in the list of options when creating or updating posts.</div>
        <ServicesArray array={array}/>
        <Link to={'/updateservices/addnewservice'} className={Styles.addNewContainer}>Add new service</Link>
      </div>
    </AdminWrapper>
  );
};