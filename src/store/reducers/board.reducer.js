import { boardService } from "../../services/board.service";
import { socketService, SOCKET_EMIT_BOARD_UPDATED } from '../../services/socket.service'

const initialState = {
    board: {},
    // activities: [],
    isLabelsExpended: false,
    currBoardUser: {}
}

export function boardReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_BOARD':
            if (action.board.activities.length > 20) {
                action.board.activities.pop();
            }
            // boardService.save(action.board);
            // socketService.emit(SOCKET_EMIT_BOARD_UPDATED, action.board)
            newState = {...state, board: action.board }
            // console.log('BOARD CHANGED IN REDUCER');
            break;
        case 'HANDLE_LABELS':
            const isLabelsExpended = state.isLabelsExpended;
            newState = {...state, isLabelsExpended: !isLabelsExpended }
            break;
        case 'ATTACH_BOARD_USER':
            newState = {...state, currBoardUser: action.loggedInUser }
            break;
    }
    return newState;
}


// case 'ADD_TASK':
//     let { groups } = state.board;
//     groups[action.addAction.idx].tasks.push(action.addAction.task)
//     newState = {...state, board: {...state.board, groups } }
//     break;