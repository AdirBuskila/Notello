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

export function saveBoard(board) {
    return async(dispatch) => {
        try {
            await boardService.saveBoard(board)
            const action = { type: 'SET_BOARD', board }
            dispatch(action)
        } catch (err) {
            console.log('cant load board');
            throw new Error(err);
        }
    };
}