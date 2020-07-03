import React, {useContext, useState} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Admin from './components/Admin';
import AdminPanel from './components/AdminPanel';
import PostManager from './components/PostManager';
import PostResponse from './components/PostResponse';
import ChangeEmail from './components/ChangeEmail';
import ChangeServices from './components/ChangeServices';
import Service from './components/Service';
import AddService from './components/AddService';
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
  const {setFooterColor} = useContext(ConfigContext);
  setFooterColor('#f1f1f1');
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest)
    }} />
  );
};

const AdminRoute = ({ component, ...rest }) => {
  const {token, setFooterColor} = useContext(ConfigContext);
  setFooterColor('white');
  return (
    <Route {...rest} render={routeProps => (
      token ? renderMergedProps(component, routeProps, rest) : <Redirect to='/admin' />
    )} />
  );
};

const LoggedOutRoute = ({ component, ...rest }) => {
  const {token, setFooterColor} = useContext(ConfigContext);
  setFooterColor('white');
  return (
    <Route {...rest} render={routeProps => (
      !token ? renderMergedProps(component, routeProps, rest) : <Redirect to='/adminPanel' />
    )} />
  );
};

function AppRoutes() {
  
  const [footerColor, setFooterColor] = useState('#ccc');
  const { isMobile, url, env } = useConfig(window.location.hostname);
  const { token, createToken, removeToken, tokenMessage } = useToken(url);
  
  return (
    <ConfigContext.Provider value={{
      isMobile: isMobile,
      url: url,
      env: env,
      token: token,
      setFooterColor: setFooterColor
    }}
    >
      <Header />
      <Switch>
        <PropsRoute path="/" exact strict component={Home} />
        <PropsRoute path="/about" exact strict component={About} />
        <PropsRoute path="/work" exact strict component={Work} />
        <PropsRoute path="/contact" exact strict component={Contact} />
        <LoggedOutRoute path="/admin" exact strict component={Admin} createToken={createToken} tokenMessage={tokenMessage}/>
        <AdminRoute path="/adminPanel" exact strict component={AdminPanel} removeToken={removeToken} />
        <AdminRoute path="/postresponse" exact strict component={PostResponse} />
        <AdminRoute path="/uploadpost" exact strict component={PostManager} heading={'Create Post'} />
        <AdminRoute path="/editpost" exact strict component={PostManager} heading={'Edit Post'} />
        <AdminRoute path="/changeemail"  exact strict component={ChangeEmail} createToken={createToken} />
        <AdminRoute path="/updateservices"  exact strict component={ChangeServices} />
        <AdminRoute path="/updateservices/service"  exact strict component={Service} />
        <AdminRoute path="/updateservices/addnewservice"  exact strict component={AddService} />
      </Switch>
      <Footer footerColor={footerColor}/>
    </ConfigContext.Provider>
  );
};

export default AppRoutes;