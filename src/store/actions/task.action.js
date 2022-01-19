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
