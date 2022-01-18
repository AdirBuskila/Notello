import { HomePage } from './pages/home-page'
import { Board } from './pages/board-page'
import { BoardDetails } from './pages/board-details'
import { Login } from './pages/login-page'



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
        component: Board,
    },
    {
        path: '/board-details',
        component: BoardDetails,
    },

]

