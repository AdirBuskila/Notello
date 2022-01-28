import { boardService } from '../../services/board.service';
import { utilService } from "../../services/util.service";

export function loadBoard(boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            const action = { type: 'SET_BOARD', board }
            dispatch(action)
            return board;
        } catch (err) {
            console.log('cant load board');
            throw new Error(err);
        }
    };
}

export function saveBoard(board) {
    return async (dispatch) => {
        try {
            await boardService.save(board)
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