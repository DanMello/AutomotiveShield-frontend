import React, {useEffect, useContext} from 'react';
import {ConfigContext} from '../routes';
import ImageBanner from './ImageBanner';
import Styles from 'styles/Work.css';

export default function Work () {

  const { url } = useContext(ConfigContext);

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
            
          <div className={Styles.inputContainer}>
            <input className={Styles.input} placeholder='Search our work' />
          </div>

          <div>

          </div>

        </div>
    </div>
  );
};