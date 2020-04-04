import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Admin from './components/Admin';
import AdminPanel from './components/AdminPanel';
import Home from './components/Home';
import About from './components/About';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';

import useConfig from './hooks/useConfig';
import useToken from './hooks/useToken';

export const ConfigContext = React.createContext();

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest)
  return (
    React.createElement(component, finalProps)
  );
};

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest)
    }} />
  );
};

function AppRoutes() {
  
  const { isMobile, url, env } = useConfig(window.location.hostname);
  const { token, createToken, removeToken } = useToken(url);
  
  return (
    <ConfigContext.Provider value={{
      isMobile: isMobile,
      url: url,
      env: env,
      token: token
    }}
    >
      <Header />
      <Switch>
        <PropsRoute path="/" exact strict component={Home} />
        <PropsRoute path="/about" exact strict component={About} />
        <PropsRoute path="/work" exact strict component={Work} />
        <PropsRoute path="/contact" exact strict component={Contact} />
        <PropsRoute path="/admin" exact strict component={Admin} createToken={createToken} />
        <PropsRoute path="/adminPanel" exact strict component={AdminPanel} removeToken={removeToken} />
      </Switch>
      <Footer />
    </ConfigContext.Provider>
  );
};

export default AppRoutes;