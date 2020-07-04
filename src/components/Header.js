import React, {useState, useEffect, useRef, useContext} from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { ConfigContext } from '../routes';
import DesktopStyles from 'styles/DesktopHeader.css';
import MobileStyles from 'styles/MobileHeader.css';
import { animated, useSpring, useChain, useTrail } from 'react-spring';

function DeskTopHeader ({token}) {
  return (
    <div className={DesktopStyles.headerContainer}>
      <Link to={'/'} className={DesktopStyles.logoContainer}>
        <img className={DesktopStyles.logo} src={'assets/autologo.png'} />
      </Link>
      <nav className={DesktopStyles.navContainer}>
        <ul className={DesktopStyles.ul}>
          <li className={DesktopStyles.li}>
            <NavLink 
              activeClassName={DesktopStyles.linkActive} 
              className={DesktopStyles.link}
              exact={true}
              to={'/'}
            >
            Home
            </NavLink>
          </li>
          <li className={DesktopStyles.li}>
            <NavLink
                activeClassName={DesktopStyles.linkActive} 
                className={DesktopStyles.link}
                to={'/about'}
              >
              About
              </NavLink>
          </li>
          <li className={DesktopStyles.li}>
            <NavLink
                activeClassName={DesktopStyles.linkActive} 
                className={DesktopStyles.link}
                to={'/work'}
              >
              Our Work
              </NavLink>
          </li>
          <li className={DesktopStyles.li}>
            <NavLink
                activeClassName={DesktopStyles.linkActive} 
                className={DesktopStyles.link}
                to={'/contact'}
              >
              Contact
              </NavLink>
          </li>
          {token && 
            <li className={DesktopStyles.li}>
              <NavLink
                  activeClassName={DesktopStyles.activeLink} 
                  className={DesktopStyles.adminLink}
                  to={'/adminPanel'}
                >
                Admin
              </NavLink>
            </li>
          }
        </ul>
      </nav>
    </div>
  );
};

function MobileHeader ({token}) {
  const [isOpen, toggleOpen] = useState(false);
  const containerRef = useRef();
  const containerProps = useSpring({
    ref: containerRef, 
    height: isOpen ? '100%' : '0%'
  });
  const items = [
    {to: '/', name: 'Home'},
    {to: '/about', name: 'About'},
    {to: '/work', name: 'Our Work'},
    {to: '/contact', name: 'Contact'},
    {to: '/adminPanel', name: 'Admin', token: true}
  ];
  const itemsRef = useRef();
  const itemProps = useTrail(items.length, {
    ref: itemsRef, 
    opacity: isOpen ? 1 : 0,
    x: isOpen ? 0 : -100,
    from: { opacity: 0, x: -100 },
  });
  
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(MobileStyles.fixed)
    } else {
      document.body.classList.remove(MobileStyles.fixed)
    };
  }, [isOpen]);
  
  useChain(isOpen ? [containerRef, itemsRef] : [itemsRef, containerRef], [0, isOpen ? 0.1 : 0.6]);

  function toggleMenu() {
    toggleOpen(prevState => !prevState);
  };
  return (
    <div className={MobileStyles.mainContainer}>
      <Link className={MobileStyles.logoContainer} to='/'>
        <img src='assets/autologo.png' className={MobileStyles.logo} />
      </Link>
      <div></div>
      <div onClick={toggleMenu} className={MobileStyles.navContainer}>
        <div className={!isOpen ? MobileStyles.bar : [MobileStyles.bar, MobileStyles.changeOne].join(" ")}></div>
        <div className={!isOpen ? MobileStyles.bar : null}></div>
        <div className={!isOpen ? MobileStyles.bar : [MobileStyles.bar, MobileStyles.changeTwo].join(" ")}></div>
      </div>
      <animated.div style={containerProps} className={MobileStyles.navPortalContainer}>
        <div className={MobileStyles.linkContainer}>
          {itemProps.map((props, index) => {
            if (items[index].token && token) {
              return (
                <animated.div key={index} style={props} className={MobileStyles.animatedLinkContainer} onClick={toggleMenu}>
                  <NavLink 
                    activeClassName={MobileStyles.activeLink} 
                    className={MobileStyles.adminLink}
                    exact={true}
                    to={items[index].to}
                    >
                    {items[index].name}
                  </NavLink>
                </animated.div>
              );
            } else if (!items[index].token) {
              return (
                <animated.div key={index} style={props} className={MobileStyles.animatedLinkContainer} onClick={toggleMenu}>
                  <NavLink 
                    activeClassName={MobileStyles.active}
                    className={MobileStyles.link}
                    exact={true}
                    to={items[index].to}
                    >
                    {items[index].name}
                  </NavLink>
                </animated.div>
              );
            };
          })}
        </div>
      </animated.div>
    </div>
  );
};

export default function Header() {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { token } = useContext(ConfigContext);
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);
  function handleWindowSizeChange () {
    setScreenSize(window.innerWidth);
  };
  return screenSize > 768 ? <DeskTopHeader token={token}/> : <MobileHeader token={token}/>
};