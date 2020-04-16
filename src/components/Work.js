import React, {useEffect, useContext, useState} from 'react';
import {ConfigContext} from '../routes';
import { Link } from 'react-router-dom';
import ImageBanner from './ImageBanner';
import Styles from 'styles/Work.css';

export default function Work () {

  const { url, token } = useContext(ConfigContext);

  useEffect(() => {
    fetch(url + '/api/cars?limit=3').then(response => {
      return response.json()
    }).then(response => {
      console.log(response)
    })
  }, []);

  return (
    <div>
      <ImageBanner 
        url={"/assets/smallslide1-min.JPEG"} 
        heading={"Our Work"}
        paragraph={"When it comes to paint protection, we've seen it all and done it all."}
        bottomStatement={"See some of our work below"}
        />
        <div className={Styles.container}>
          {token && <Link to='/uploadpost'>Upload post</Link>}
          <div className={Styles.inputContainer}>
            <input className={Styles.input} placeholder='Search our work' />
          </div>

          <div>

          </div>

        </div>
    </div>
  );
};