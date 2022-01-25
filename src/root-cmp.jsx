import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import { routes } from './routes';
// import AppFooter from './cmps/AppFooter';

export const RootCmp = () => {
  return (
    <Switch>
      <div className='page-contianer flex column'>
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
      </div>
    </Switch>
  );
};
