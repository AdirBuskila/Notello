const initialState = {
    filterBy: {
        name: '',
        labels: [],
    },
    selectedBoard: null
}

export function boardReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_BOARD':
            newState = { ...state, selectedBoard: [...action.board] }
            break;
        default:
    }
    return newState;
}
