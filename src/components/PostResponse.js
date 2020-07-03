import React, { useState } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import Styles from 'styles/PostResponse.css';

export default function PostResponse () {

  const values = queryString.parse(location.search);
  let message = values.message;
  let heading = values.heading;
  let link = values.link;

  console.log(values)

  return (
    <div className={Styles.container}>
      <div className={Styles.subContainer}>
        <div className={Styles.message}>{message}</div>
        <Link className={Styles.button} to={link}>Return to {heading} page</Link>
      </div>
    </div>
  );
};