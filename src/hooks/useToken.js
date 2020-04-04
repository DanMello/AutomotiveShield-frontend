import { useEffect, useState } from 'react';

export default function useToken(url) {

  const [token, setToken] = useState(localStorage.getItem('token'));

  function createToken(token) {
    localStorage.setItem('token', token);
    setToken(token);
  };

  function removeToken() {
    localStorage.removeItem('token');
    setToken(null);
  };
  
  useEffect(() => {
    if (!token) return;
    
    fetch(url + '/api/checkToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: token})
    }).then(response => response.json()).then(response => {
      if (response.error) {
        removeToken();
        return;
      };
    }).catch(() => {
      removeToken();
    });
  }, [token]);

  return { token, createToken, removeToken };
};