import { httpService } from './http.service'
import { utilService } from './util.service.js'





export const boardService = {
    query,
    getById,
    remove,
    save,
    addTask,
    removeTask,
    updateTask,
    getTaskById,
    getTaskIdxById,
    addGroup,
    removeGroup,
    addLabel,
    removeLabel,
    updateLabel,
    getGroupIdxById,
    getGroupsIds,
    addAttachment,
    getTask,
    getGroup,
    getMemberById,
    addGeneralActivity,
    addTaskActivity,
    getModalPosition,
    getNotificationMode,
    // addActivity
}




/* Get Data From BackEnd */
// export const toyService = {
//     query,
//     getById,
//     remove,
//     save,
//     // getLabels
// }

function query() {
    try { return httpService.get(`board`) } catch (err) {
        console.log(err);
    }

}

function getById(boardId) {
    try { return httpService.get(`board/${boardId}`) } catch (err) {
        console.log(err);
    }
}

function remove(boardId) {
    try { return httpService.delete(`board/${boardId}`) } catch (err) {}
}

async function save(board) {
    const { _id } = board
    try {
        if (_id) {
            return await httpService.put(`board/${_id}`, board)
        } else return await httpService.post((`board`), board)
    } catch (err) {
        console.log(err);
    }
}








/* Front Service */

function getModalPosition(clickedElementPos) {
    console.log('clickedElementPos:', clickedElementPos);

    const position = {
        topPos: clickedElementPos.top + clickedElementPos.height + 6,
        leftPos: clickedElementPos.left
    };
    let intViewportWidth = window.innerWidth;
    console.log('window:', window.innerHeight);
    // const isOverflowY = (window.innerHeight - height - 45) < 0

    if (intViewportWidth - position.leftPos <= 40) position.right = 0
    else position.right = null
    return position;
}


function getNotificationMode(board, activity, loggedInUser) {
    const searchTask = getTask(board, activity.task._id)
    const taskMembers = searchTask.members
    console.log('TaskMembers', taskMembers);
    taskMembers.filter((member) => {
        return (member._id === loggedInUser._id)
    });

    if (taskMembers.length === 0) return false


    const isNoti = activity.wasShownTo.find((user) => {
        return (user._id === loggedInUser._id)
    })
    if (isNoti) return false
    return true



}



function addGeneralActivity(txt, loggedInUser) {
    return {
        txt,
        byMember: loggedInUser,
        _id: utilService.makeId(),
        createdAt: Date.now(),

    }
}
///////// nt ////// label 
function addTaskActivity(txt, taskId, taskTitle, loggedInUser) {
    return {
        txt,
        task: {
            _id: taskId,
            title: taskTitle
        },
        byMember: loggedInUser,
        _id: utilService.makeId(),
        createdAt: Date.now(),
        wasShownTo: [loggedInUser],
    }
}


async function addTask(boardId, groupId, task, activity) {
    task._id = utilService.makeId()
    task.labels = (task.labels) ? task.labels : [];
    task.attachments = (task.attachments) ? task.attachments : [];
    task.comments = (task.comments) ? task.comments : [];
    task.description = (task.description) ? task.description : '';
    task.checklists = (task.checklists) ? task.checklists : [];
    task.members = (task.members) ? task.members : [];
    task.dueDate = (task.dueDate) ? task.dueDate : [];
    activity.task = {
        _id: task._id,
        title: task.title
    };

    // console.log('TASK ACTIVITY in line 147', activity);
    try {
        let board = await getById(boardId)
        const groupIdx = getGroupIdxById(board, groupId)
        board.groups[groupIdx].tasks.push(task);
        board.activities.unshift(activity)
        await save(board)
        return task
    } catch (err) {
        console.log(`Cant add task to board`);
    }
}

async function removeTask(boardId, groupId, taskId) {
    try {
        let board = await getById(boardId)
        const groupIdx = getGroupIdxById(board, groupId)
        board = board.groups[groupIdx].tasks.filter(task => {
            return (task._id !== taskId)
        });
        const updatedBoard = await save(board)
        return updatedBoard
    } catch (err) {
        console.log(`Cant remove task ${taskId} from board`);
    }
}

async function updateTask(boardId, groupId, updatedTask) {
    try {
        let board = await getById(boardId)
        const groupIdx = getGroupIdxById(board, groupId)
        board = board.groups[groupIdx].tasks.map(task => {
            return (task._id === updatedTask._id) ? updatedTask : task
        });
        const updatedBoard = await save(board)
        return updatedBoard
    } catch (err) {
        console.log(`Cant update task ${updatedTask._id} in board`);
    }
}

async function getTaskById(boardId, groupId, taskId) {
    let board = await getById(boardId)
    const groupIdx = getGroupIdxById(board, groupId)
    const task = board.groups[groupIdx].tasks.filter(task => {
        return task._id === taskId
    });
    return task;
}

async function addGroup(boardId, group, activity) {

    group._id = utilService.makeId()
    group.tasks = [];
    // console.log('GROUP ACTIVITY in line 147', activity);
    try {
        let board = await getById(boardId)
        board.groups.push(group)
        board.activities.unshift(activity)
        console.log(board.activities);
        const updatedBoard = save(board)
        return updatedBoard
    } catch (err) {
        console.log(`Cant add group to board`);
    }
}

async function removeGroup(boardId, groupId) {
    try {
        let board = await getById(boardId)
        board = board.groups.filter(group => {
            return (group._id !== groupId)
        });
        const updatedBoard = save(board)
        return updatedBoard
    } catch (err) {
        console.log(`Cant remove group ${groupId} from board`);
    }
}

function getGroupsIds(board) {
    var groupsIds = []
    groupsIds = board.groups.map((group) => {
        return group._id
    })
    return groupsIds
}

async function addLabel(label, boardId, groupId, taskId) {
    label._id = utilService.makeId()
    try {
        let board = await getById(boardId)
        const groupIdx = getGroupIdxById(board, groupId)
        const taskIdx = getTaskIdxById(board, groupId, taskId)
        board.groups[groupIdx].tasks[taskIdx].labels.push(label)
        const updatedBoard = save(board)
        return updatedBoard
    } catch (err) {
        console.log(`Cant add label to ${taskId}`);
    }
}

async function removeLabel(labelId, boardId, groupId, taskId) {
    try {
        let board = await getById(boardId)
        const groupIdx = getGroupIdxById(board, groupId)
        const taskIdx = getTaskIdxById(board, groupId, taskId)
        board = board.groups[groupIdx].tasks[taskIdx].labels.filter(label => {
            return (label._id !== labelId)
        })
        const updatedBoard = save(board)
        return updatedBoard
    } catch (err) {
        console.log(`Cant remove label from ${taskId}`);
    }
}

async function updateLabel(updatedLabel, boardId, groupId, taskId) {
    try {
        let board = await getById(boardId)
        const groupIdx = getGroupIdxById(board, groupId)
        const taskIdx = getTaskIdxById(board, groupId, taskId)
        board = board.groups[groupIdx].tasks[taskIdx].labels.map(label => {
            return (label._id === updatedLabel._id) ? updatedLabel : label
        })
        const updatedBoard = save(board)
        return updatedBoard
    } catch (err) {
        console.log(`Cant update label at ${taskId}`);
    }
}

function getGroupIdxById(board, groupId) {

    const _idx = board.groups.findIndex(group => {
        return (group._id === groupId)
    })
    return _idx;
}

async function getTaskIdxById(board, groupId, taskId) {
    try {
        const groupIdx = await getGroupIdxById(board, groupId)
        const _idx = board.groups[groupIdx].tasks.findIndex(task => {
            return (task._id === taskId)
        })
        return _idx
    } catch (err) {
        console.log('Cant get Task idx by id');
    }
}


async function addAttachment(attachment, boardId, groupId, taskId) {
    attachment._id = utilService.makeId()
    if (!attachment.name) attachment.name = 'New Attachment'
    try {
        let board = await getById(boardId)
        const groupIdx = getGroupIdxById(board, groupId)
        const taskIdx = getTaskIdxById(board, groupId, taskId)
        board.groups[groupIdx].tasks[taskIdx].push(attachment)
        const updatedBoard = save(board)
        return updatedBoard
    } catch (err) {
        console.log('cannot add attachment', err);
    }

}

function getGroup(board, taskId) {
    const group = board.groups.filter((group) => {
        return group.tasks.find((currTask) => {
            return currTask._id === taskId
        })
    })
    return group[0]
}

function getTask(board, taskId) {
    const group = getGroup(board, taskId)
    const task = group.tasks.find((currTask) => {
        return (currTask._id === taskId)
    })
    return task
}


function getMemberById(board, memberId) {
    const member = board.members.find((currMember) => {
        return (currMember._id === memberId)
    })
    return member

}