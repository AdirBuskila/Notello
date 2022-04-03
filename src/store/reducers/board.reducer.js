const initialState = {
    board: {},
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