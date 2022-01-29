import { boardService } from "../../services/board.service";

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
            boardService.save(action.board);
            newState = { ...state, board: action.board }
            break;
        case 'HANDLE_LABELS':
            const isLabelsExpended = state.isLabelsExpended;
            newState = { ...state, isLabelsExpended: !isLabelsExpended }
            break;
        case 'ATTACH_BOARD_USER': 
            newState = {...state, currBoardUser: action.loggedInUser}
            break;
        // case 'SET_GENERAL_ACTIVITY':
        //     newState = { ...state, activities: [...state.activities, action.activity] }
        //     break;
        // case 'SET_TASK_ACTIVITY':
        //     newState = { ...state, activities: [...state.activities, action.activity] }
        //     break;
    }
    return newState;
}


// case 'ADD_TASK':
//     let { groups } = state.board;
//     groups[action.addAction.idx].tasks.push(action.addAction.task)
//     newState = {...state, board: {...state.board, groups } }
//     break;