const initialState = {
    board: {},
}

export function boardReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_BOARD':
            newState = { ...state, board: action.board }
            break;
        // case 'ADD_TASK':
        //     newState = { ...state, tasks: [...state.tasks, action.task] }
        //     break;
    }
    return newState;
}
