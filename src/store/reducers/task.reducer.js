const initialState = {
    tasks: [],
    selectedTask: ''
    // selectedGroup: ''
}

export function taskReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'ADD_TASK':
            newState = { ...state, tasks: [...state.tasks, action.task] }
            break;
    }
    switch (action.type) {
        case 'SET_TASK':
            newState = { ...state, selectedTask: action.task }
            break;
    }
    return newState;
}
