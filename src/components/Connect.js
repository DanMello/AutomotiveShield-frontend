import React, { useState, useContext } from 'react';
import { ConfigContext } from '../routes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Banner from './Banner';
import LoadingButton from './LoadingButton';
import Styles from 'styles/Connect.css';

export default function Connect ({heading}) {

  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [activeInput, setActiveInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const { url, isMobile } = useContext(ConfigContext);

  function focus(e) {
    setActiveInput(e.target.id);
  };

  function blur(e) {
    setActiveInput('');
  };

  function changeContact(e) {
    setContact({
      ...contact,
      [e.target.id]: e.target.value
    });
  };

  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  function submit() {
    setError('');
    const emptyItems = Object.keys(contact).every(item => contact[item] !== '');
    if (!emptyItems) {
      setError('Some inputs are empty, please make sure all inputs are filled out.');
      return;
    };
    if (!validateEmail(contact.email)) {
      setError('The email you entered seems to be invalid, please double check and try again');
      return;
    };
    setLoading(true);
    fetch(url + '/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    }).then(response => response.json()).then(response => {
      if (response.error) {
        throw new Error(response.message)
      };
      setLoading(false);
      setResponse(response.message)
    }).catch(err => {
      setLoading(false);
      setError(err.message)
    });
  };

  return (
    <div>
      <Banner heading={heading} color='white' fontColor='#444' paddingBottom={'10px'}/>
      <div className={Styles.container}>
        <div className={Styles.subContainer}>
          <div className={Styles.response}>{response}</div>
          <div className={Styles.error}>{error}</div>

          <div className={Styles.doubleInput}>
            <input
              id='firstName'
              type='text'
              placeholder='First Name'
              className={activeInput === 'firstName' ? [Styles.input, Styles.focus].join(' ') : Styles.input}
              onChange={changeContact}
              value={contact.firstName}
              onFocus={focus}
              onBlur={blur}
            />
            <input
              id='lastName'
              type='text' 
              placeholder='Last Name'
              className={activeInput === 'lastName' ? [Styles.input, Styles.focus].join(' ') : Styles.input}
              value={contact.lastName}
              onChange={changeContact}
              style={{marginLeft: '20px'}}
              onFocus={focus}
              onBlur={blur}
            />
          </div>
          <input
            id='email'
            type='email' 
            placeholder='Your email'
            value={contact.email}
            onChange={changeContact}
            className={activeInput === 'email' ? [Styles.input, Styles.focus].join(' ') : Styles.input}
            style={{marginTop: '20px'}}
            onFocus={focus}
            onBlur={blur}
          />
          <textarea
            id='message' 
            type='' 
            placeholder='Have any questions or want to schedule an appointment? Let us know!'
            value={contact.message}
            onChange={changeContact}
            className={activeInput === 'message' ? [Styles.textArea, Styles.focus].join(' ') : Styles.textArea}
            style={{marginTop: '20px'}}
            onFocus={focus}
            onBlur={blur}
          />
          <LoadingButton title='Send message' onClick={submit} loading={loading} />
        </div>
      </div>
    </div>
  );
};