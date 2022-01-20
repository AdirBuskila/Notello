import { storageService } from './async-storage.service.js'
import { pathToStorage } from './storage.service.js'
import { utilService } from './util.service.js'


export const boardService = {
    query,
    getBoardById,
    saveBoard,
    remove: removeBoard,
    addTask,
    removeTask,
    updateTask,
    getTaskById,
    addGroup,
    removeGroup,
    addLabel,
    removeLabel,
    updateLabel,
    getGroupIdxById
}

const STORAGE_KEY = 'board_DB'
var gBoards;

_createBoards()

async function _createBoards() {
    gBoards = pathToStorage.loadFromStorage(STORAGE_KEY) || []
    if (!gBoards || gBoards.length === 0) {
        try {
            gBoards = [{
                _id: 'b101',
                title: 'Board1',
                createdAt: Date.now(),
                createdBy: {
                    _id: 'u101',
                    fullname: "Netanel C",
                    imgUrl: ""
                },
                style: {
                    bgColor: '#222'
                },
                labels: [{
                        _id: utilService.makeId(),
                        name: 'Work',
                        bgc: '#8E806A'
                    },
                    {
                        _id: utilService.makeId(),
                        name: 'Relavent',
                        bgc: '#F0BB62'
                    },
                    {
                        _id: utilService.makeId(),
                        name: 'Special',
                        bgc: '#F999B7'
                    },
                    {
                        _id: utilService.makeId(),
                        name: 'Important',
                        bgc: '#FF5677'
                    }
                ],
                members: [{
                    _id: 'm101',
                    fullname: 'Adir adir',
                    imgUrl: ''
                }],
                groups: [{
                        _id: 'g101',
                        title: 'Group 1',
                        dueDate: 1826212211,
                        style: {
                            bgColor: '#f2f3'
                        },
                        tasks: [{
                                _id: 't101',
                                title: 'Gurevich loves scrolling (specially Y axis)',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#8E806A'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#F0BB62'
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: 'm102',
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },
                            {
                                _id: 't102',
                                title: 'Adir you are a SAVAGE!',
                                labels: [{
                                        name: 'Special',
                                        bgc: '#F999B7'
                                    },
                                    {
                                        name: 'Work',
                                        bgc: '#8E806A'
                                    }
                                ],
                                createdAt: Date.now(),
                                checklists: [{
                                    id: utilService.makeId(),
                                    title: 'Checklist',
                                    todos: [{
                                        id: 'todo101',
                                        title: 'To Do 1',
                                        isDone: false
                                    }]
                                }],
                            }
                        ],
                    },
                    {
                        _id: 'g102',
                        title: 'Group 2',
                        dueDate: 1846712211,
                        style: {
                            bgColor: '#ee3'
                        },
                        tasks: [{
                                _id: 't108',
                                title: 'Waiting for ilai!',
                                labels: [{
                                        name: 'General',
                                        bgc: '#8E6A'
                                    },
                                    {
                                        name: 'Education',
                                        bgc: '#F03362'
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: 'm102',
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },
                            {
                                _id: 't103',
                                title: 'EFRAIM rulesss!',
                                labels: [{
                                        name: 'new',
                                        bgc: '#F9B7'
                                    },
                                    {
                                        name: 'Special',
                                        bgc: '#806A'
                                    }
                                ],
                                createdAt: Date.now(),
                                checklists: [{
                                    id: utilService.makeId(),
                                    title: 'Checklist2',
                                    todos: [{
                                        id: 'todo102',
                                        title: 'To Do 2',
                                        isDone: true
                                    }]
                                }],
                            }
                        ],
                    }
                ],
                activities: [{
                    id: 'a101',
                    txt: 'Changed Color',
                    createdAt: 1545212324,
                    byMember: {
                        _id: 'u101',
                        fullname: "Adir B",
                        imgUrl: ""
                    },
                    task: {
                        id: 'c102',
                        title: 'Notello'
                    }
                }]
            }, ]
            pathToStorage.saveToStorage(STORAGE_KEY, gBoards);
            return gBoards;
        } catch (err) {
            console.log('Cant load boards');
            throw new Error(err);
        }
    }
}

async function addTask(boardId, groupId, task, activity = '') {
    console.log("task: ", task);
    task._id = utilService.makeId();
    try {
        let board = await getBoardById(boardId)
        const groupIdx = getGroupIdxById(board, groupId)
        board.groups[groupIdx].tasks.push(task);
        board.activities.unshift(activity)
        const updatedBoard = await saveBoard(board)
        return updatedBoard
    } catch (err) {
        console.log(`Cant add task ${task._Id} to board`);
    }
}

async function removeTask(boardId, groupId, taskId, activity) {
    try {
        let board = await getBoardById(boardId)
        const groupIdx = getGroupIdxById(board, groupId)
        board = board.groups[groupIdx].tasks.filter(task => {
            return (task._id !== taskId)
        });
        board.activities.unshift(activity)
        const updatedBoard = await saveBoard(board)
        return updatedBoard
    } catch (err) {
        console.log(`Cant remove task ${taskId} from board`);
    }
}

async function updateTask(boardId, groupId, updatedTask, activity) {
    try {
        let board = await getBoardById(boardId)
        const groupIdx = getGroupIdxById(board, groupId)
        board = board.groups[groupIdx].tasks.map(task => {
            return (task._id === updatedTask._id) ? updatedTask : task
        });
        board.activities.unshift(activity)
        const updatedBoard = await saveBoard(board)
        return updatedBoard
    } catch (err) {
        console.log(`Cant update task ${updatedTask._id} in board`);
    }
}

async function getTaskById(boardId, groupId, taskId) {
    let board = await getBoardById(boardId)
    const groupIdx = getGroupIdxById(board, groupId)
    const task = board.groups[groupIdx].tasks.filter(task => {
        return task._id === taskId
    });
    return task;
}

async function addGroup(boardId, group, activity) {
    try {
        let board = await getBoardById(boardId)
        board.groups.push(group)
        board.activities.unshift(activity)
        const updatedBoard = saveBoard(board)
        return updatedBoard
    } catch (err) {
        console.log(`Cant add group ${group._id} to board`);
    }
}

async function removeGroup(boardId, groupId, activity) {
    try {
        let board = await getBoardById(boardId)
        board = board.groups.filter(group => {
            return (group._id !== groupId)
        });
        board.activities.unshift(activity)
        const updatedBoard = saveBoard(board)
        return updatedBoard
    } catch (err) {
        console.log(`Cant remove group ${groupId} from board`);
    }
}

async function addLabel(label, boardId, groupId, taskId, activity) {
    try {
        let board = await getBoardById(boardId)
        const groupIdx = getGroupIdxById(board, groupId)
        const taskIdx = getTaskIdxById(board, groupId, taskId)
        board.groups[groupIdx].tasks[taskIdx].labels.push(label)
        board.activities.unshift(activity)
        const updatedBoard = saveBoard(board)
        return updatedBoard
    } catch (err) {
        console.log(`Cant add label to ${taskId}`);
    }
}

async function removeLabel(labelId, boardId, groupId, taskId, activity) {
    try {
        let board = await getBoardById(boardId)
        const groupIdx = getGroupIdxById(board, groupId)
        const taskIdx = getTaskIdxById(board, groupId, taskId)
        board = board.groups[groupIdx].tasks[taskIdx].labels.filter(label => {
            return (label._id !== labelId)
        })
        board.activities.unshift(activity)
        const updatedBoard = saveBoard(board)
        return updatedBoard
    } catch (err) {
        console.log(`Cant remove label from ${taskId}`);
    }
}

async function updateLabel(updatedLabel, boardId, groupId, taskId, activity) {
    try {
        let board = await getBoardById(boardId)
        const groupIdx = getGroupIdxById(board, groupId)
        const taskIdx = getTaskIdxById(board, groupId, taskId)
        board = board.groups[groupIdx].tasks[taskIdx].labels.map(label => {
            return (label._id === updatedLabel._id) ? updatedLabel : label
        })
        board.activities.unshift(activity)
        const updatedBoard = saveBoard(board)
        return updatedBoard
    } catch (err) {
        console.log(`Cant update label at ${taskId}`);
    }
}

function getGroupIdxById(board, groupId) {
    console.log("board: ", board);
    console.log("groupId: ", groupId);
    const idx = board.groups.findIndex(group => {
        return (group._id === groupId)
    })
    return idx;
}

function getTaskIdxById(board, groupId, taskId) {
    const groupIdx = getGroupIdxById(board, groupId)
    const idx = board.groups[groupIdx].tasks.findIndex(task => {
        return (task._id === taskId)
    })
    return idx
}

function query() {
    return storageService.query(STORAGE_KEY)
}

function getBoardById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

function removeBoard(boardId) {
    return storageService.remove(STORAGE_KEY, boardId)
}

function saveBoard(board) {
    console.log("board: ", board);
    if (board._id) {
        return storageService.put(STORAGE_KEY, board)
    } else {
        return storageService.post(STORAGE_KEY, board)
    }
}