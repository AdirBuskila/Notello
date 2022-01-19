
import { taskService } from "../../services/task.service";

export function loadTasks(tasksGroup) {
    return async (dispatch) => {
        try {
            const tasks = await taskService.query({group: tasksGroup})
            const action = {type: 'SET_TASKS', tasks}
            dispatch(action) 
            return tasks;
        } catch (err) {
            console.log('cant load tasks per group');
            throw new Error(err);
        }
    };
}
