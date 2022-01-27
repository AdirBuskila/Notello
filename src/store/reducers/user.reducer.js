const initialState = {
    loggedInUser : {
        _id: 'GuestId',
        username: 'Guest',
        fullname: 'Guest',
        imgUrl: 'https://res.cloudinary.com/dubjerksn/image/upload/v1643293928/Notello/wkyvzzdkw2e4whnbt1lt.png'
    }
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
