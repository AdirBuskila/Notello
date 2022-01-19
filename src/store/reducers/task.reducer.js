const initialState = {
    tasks: [],
    // selectedGroup: ''
}

export function taskReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_TASKS':
            newState = { ...state, tasks: action.tasks }
            break;
        case 'ADD_TASK':
            newState = { ...state, tasks: [...state.tasks, action.task] }
            break;
    }
    return newState;
}
