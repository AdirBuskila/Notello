import { Switch, Route, Redirect } from 'react-router';

import { routes } from './routes';
// import AppFooter from './cmps/AppFooter';
import { AppHeader } from './cmps/app-header';

export const RootCmp = (props) => {
  console.log(props);
  return (
    <div className='page-contianer flex column'>
      <AppHeader />
      <main>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          {routes.map((route) => (
            <Route
              key={route.path}
              exact
              component={route.component}
              path={route.path}
            />
          ))}
        </Switch>
      </main>
      {/* <AppFooter /> */}
    </div>
  );
};
