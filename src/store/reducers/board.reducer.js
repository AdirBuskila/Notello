const initialState = {
    board: {}
}

export function boardReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_BOARD':
            newState = { ...state, board: action.board }
            break;
        case 'ADD_TASK':
            let {groups} = state.board;
            groups[action.addAction.idx].tasks.push(action.addAction.task)
            newState = {...state, board: {...state.board, groups}}
            break;
    }
    return newState;
}
