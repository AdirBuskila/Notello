import { boardService } from '../../services/board.service'
import { taskService } from '../../services/task.service';

export function loadBoard(boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            console.log("board in action: ", board);
            const action = {type: 'SET_BOARD', board}
            dispatch(action) 
        } catch (err) {
            console.log('cant load board');
            throw new Error(err);
        }
    };
}

export function addTask(idx, newTask) {
    return async (dispatch) => {
        try {
            const task = await taskService.save(newTask)
            const addAction = {idx, task}
            const action = {type: 'ADD_TASK', addAction}
            dispatch(action) 
        } catch (err) {
            console.log('cant load board');
            throw new Error(err);
        }
    };
}
