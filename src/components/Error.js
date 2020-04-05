import React from 'react';
import Styles from 'styles/Error.css';

export default function Error ({error}) {
  return (
    <div className={Styles.error}>{error}</div>
  );
};