import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { routes } from './routes';
// import AppFooter from './cmps/AppFooter';

export const RootCmp = () => {
  return (
    <div className='page-contianer flex column'>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/home' />
        </Route>
        {routes.map((route) => (
          <Route
            key={route.path}
            component={route.component}
            path={route.path}
          />
        ))}
        {/* <AppFooter /> */}
      </Switch>
    </div>
  );
};
