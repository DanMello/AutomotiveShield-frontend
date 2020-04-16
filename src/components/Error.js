import React from 'react';
import Styles from 'styles/Error.css';

export default function Error ({error, ...rest}) {
  return (
    <div className={Styles.error} {...rest}>{error}</div>
  );
};