import { HomePage } from './pages/home-page';
import { BoardWorkspaces } from './pages/board-workspaces';
import { BoardDetails } from './pages/board-details';
import { Login } from './pages/login-page';

export const routes = [
  {
    path: '/home',
    component: HomePage,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/board',
    component: BoardWorkspaces,
  },
  {
    path: '/b/:id',
    component: BoardDetails,
  },
];
