import React from 'react';
import Styles from 'styles/HeadQuarters.css';

export default function GoogleMap({location}) {
  return location === 'Rockland' ? 
    <iframe
      frameBorder="0"
      className={Styles.googleStyles}
      src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ3aTvBKSe5IkRvhEgjFiAv-k&key=AIzaSyCVRbmvizUkzdszh3oIl7V-6lAh0BDBJ4Q" 
      allowFullScreen
      >
    </iframe>
    :
    <iframe 
      frameBorder="0"
      className={Styles.googleStyles}
      src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJi2FfJN1z44kRZSf3uv0sd2c&key=AIzaSyCVRbmvizUkzdszh3oIl7V-6lAh0BDBJ4Q" 
      allowFullScreen
      >
    </iframe>
};