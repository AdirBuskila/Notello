import { HomePage } from './pages/home-page'
import { Board } from './pages/board-page'
import { BoardDetails } from './pages/board-details'



export const routes = [
    {
        path: '/home',
        component: HomePage,
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

