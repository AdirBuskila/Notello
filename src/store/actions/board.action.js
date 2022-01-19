import { boardService } from '../../services/board.service'

export function loadBoard(boardId) {
    return async(dispatch) => {
        try {
            const board = await boardService.getBoardById(boardId)
            const action = { type: 'SET_BOARD', board }
            dispatch(action)
        } catch (err) {
            console.log('cant load board');
            throw new Error(err);
        }
    };
}

// export function addTask(boardId, groupId, newTask) {
//     return async (dispatch) => {
//         try {
//             boardService.addTask(boardId, groupId, newTask)
//             const addAction = {idx, task}
//             const action = {type: 'ADD_TASK', addAction}
//             dispatch(action)
//         } catch (err) {
//             console.log('cant load board');
//             throw new Error(err);
//         }
//     };
// }