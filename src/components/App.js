import React, { Component } from 'react';
import Header from './Header';
import styles from 'styles/App.css';

export default class App extends Component {

  render() {
    return (
      <div id="test" className={styles.welcome}>
        <Header />
      </div>
    );
  };
};