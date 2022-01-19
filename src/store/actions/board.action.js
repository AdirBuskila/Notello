import { boardService } from '../../services/board.service'

export function loadBoard(boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            console.log("board: ", board);
            const action = {type: 'SET_BOARD', board}
            dispatch(action) 
        } catch (err) {
            console.log('cant load board');
            throw new Error(err);
        }
    };
}
