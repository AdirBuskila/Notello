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
            newState = {...state, board: action.board }
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