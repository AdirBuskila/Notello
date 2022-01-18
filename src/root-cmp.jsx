// import { Switch, Route, Redirect } from 'react-router';

import { AppHeader } from './cmps/app-header.jsx';
// import AppFooter from './cmps/AppFooter';

export const RootCmp = () => {
  return (
    <div className='App'>
      <AppHeader />
      <main>
        <h1>We Start Here</h1>
        <h1>Nati G made a change</h1>
        <h1>Nati C made a change</h1>
      </main>
    </div>
  );
};
