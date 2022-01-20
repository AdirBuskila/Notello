import { HomePage } from './pages/home-page';
import { BoardWorkspaces } from './pages/board-workspaces';
import { BoardDetails } from './pages/board-details';
import { ScrollDialog } from './pages/task-details';
import { Login } from './pages/login-page';
import { SignUp } from './pages/sign-up-page';


export const routes = [{
        path: '/home',
        component: HomePage,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/signup',
        component: SignUp,
    },
    {
        path: '/board',
        component: BoardWorkspaces,
    },
    {
        path: '/b/:id',
        component: BoardDetails,
    },
    {
        path: '/c/:id',
        component: ScrollDialog,
    },
];