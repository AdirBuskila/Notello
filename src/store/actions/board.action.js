import { boardService } from '../../services/board.service';
import { socketService } from '../../services/socket.service'

export function loadBoard(boardId, loggedInUser) {
    return async(dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            const isExist = board.members.find((member) => {
                return (member._id === loggedInUser._id)
            })
            if (!isExist) {
                board.members.push(loggedInUser);
                dispatch({ type: 'ATTACH_BOARD_USER', loggedInUser })
            }
            socketService.emit('view board', board._id)
            socketService.on('board-update', (updatedBoard) => {
                dispatch({ type: 'SET_BOARD', board: updatedBoard })
            })
            dispatch({ type: 'SET_BOARD', board })
            return board;
        } catch (err) {
            console.log('cant load board');
            throw new Error(err);
        }
    };
}

export function saveBoard(board) {
    return (dispatch) => {
        try {
            boardService.save(board)
            if (board.activities.length > 20) {
                board.activities.pop();
            }
            socketService.emit('board-update', board)
            const action = { type: 'SET_BOARD', board }
            dispatch(action)
        } catch (err) {
            console.log('cant load board');
            throw new Error(err);
        }
    };
}