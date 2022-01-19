const initialState = {
    tasks: [],
    // selectedGroup: ''
}

export function taskReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'ADD_TASK':
            newState = { ...state, tasks: [...state.tasks, action.task] }
            break;
    }
    return newState;
}
