import React from 'react';
import Loader from './Loader';
import Styles from 'styles/LoadingButton.css';

export default function LoadingButton ({title, loading, onClick, className, marginLeft}) {
  return (
    <div className={className ? className : Styles.container} onClick={onClick}>
      <div>{title}</div>
      {loading && <Loader width='25px' height='25px' thickness='2px' marginLeft={marginLeft ? marginLeft : 0}/>}
    </div>
  );
};