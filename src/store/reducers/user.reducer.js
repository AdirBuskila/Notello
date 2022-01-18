const initialState = {
    loggedInUser : null,
}

export function userReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, loggedInUser: action.user }
            break;
        default:
    }
    return newState;
}
