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
            if (board.activities.length > 20) {
                board.activities.pop();
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
            socketService.emit('board-update', board)
            const action = { type: 'SET_BOARD', board }
            dispatch(action)
        } catch (err) {
            console.log('cant load board');
            throw new Error(err);
        }
    };
}

// export function setGeneralActivity(txt, loggedInUser) {
//     return async (dispatch) => {
//         try {
//             const activity = {
//                 txt,
//                 byMember: loggedInUser,
//                 _id: utilService.makeId(),
//                 createdAt: Date.now(),
//             }
//             const action = { type: 'SET_GENERAL_ACTIVITY', activity }
//             dispatch(action)
//             return activity;
//         } catch (err) {
//             console.log('cant set general activity');
//             throw new Error(err);
//         }
//     };
// }

// export function setTaskActivity(txt, task, loggedInUser) {
//     return async (dispatch) => {
//         try {
//             const activity = {
//                 txt,
//                 task,
//                 byMember: loggedInUser,
//                 _id: utilService.makeId(),
//                 createdAt: Date.now(),
//             }
//             const action = { type: 'SET_TASK_ACTIVITY', activity }
//             dispatch(action)
//         } catch (err) {
//             console.log('cant set task activity');
//             throw new Error(err);
//         }
//     };
// }