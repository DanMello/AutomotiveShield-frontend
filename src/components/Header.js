import React, {useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import { NavLink, Link } from 'react-router-dom'
import Styles from 'styles/Header.css';

export default function Header() {

  const [isOpen, toggleOpen] = useState(false);
  const transitionStyles = {
    entering: { opacity: .5, visibility: 'visible' },
    entered:  { opacity: .5, visibility: 'visible' },
    exiting:  { opacity: 0, visibility: 'hidden' },
    exited:  { opacity: 0, visibility: 'hidden' }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(Styles.fixed)
    } else {
      document.body.classList.remove(Styles.fixed)
    };
  }, [isOpen]);

  function toggleMenu() {
    toggleOpen(prevState => !prevState);
  };

  return (
    <div className={Styles.mainContainer}>
      <Link className={Styles.logoContainer} to='/home'>
        <img src='assets/918logobig.png' className={Styles.logo} />
      </Link>
      <div></div>
      <div onClick={toggleMenu} className={Styles.navContainer}>
        <div className={!isOpen ? Styles.bar : [Styles.bar, Styles.changeOne].join(" ")}></div>
        <div className={!isOpen ? Styles.bar : null}></div>
        <div className={!isOpen ? Styles.bar : [Styles.bar, Styles.changeTwo].join(" ")}></div>
      </div>
      <Transition timeout={300} in={isOpen}>
        {state => (
          <div className={Styles.navPortalContainer} style={{...transitionStyles[state]}}>
          <div className={Styles.linkContainer}>
            <NavLink activeClassName={Styles.active} className={Styles.link} to='/'>Home</NavLink>
            <NavLink activeClassName={Styles.active} className={Styles.link} to='/about'>About</NavLink>
            <NavLink activeClassName={Styles.active} className={Styles.link} to='/services'>Services</NavLink>
            <NavLink activeClassName={Styles.active} className={Styles.link} to='/gallery'>Gallery</NavLink>
            <NavLink activeClassName={Styles.active} className={Styles.link} to='/contact'>Contact</NavLink>
          </div>
        </div>
        )}
      </Transition>
    </div>
  );
};