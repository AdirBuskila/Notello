import { taskService } from "../../services/task.service";

export function addTask(newTask) {
    return async (dispatch) => {
        try {
            const task = await taskService.save(newTask);
            const action = {type: 'ADD_TASK', task}
            dispatch(action) 
        } catch (err) {
            console.log('cant add task');
            throw new Error(err);
        }
    };
}

export function loadTask(taskId) {
    return async(dispatch) => {
        try {
            const task = await getTaskById.getTask(taskId)
            const action = { type: 'SET_TASK', task }
            dispatch(action)
            return task;
        } catch (err) {
            console.log('cant load task');
            throw new Error(err);
        }
    };
}

export function saveTask(board) {
    return async(dispatch) => {
        try {
            await boardService.saveBoard(board)
            const action = { type: 'SET_BOARD', board }
            dispatch(action)
        } catch (err) {
            console.log('cant load board');
            throw new Error(err);
        }
    };
}