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
    getGroupIdxById,
    getGroupsIds
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
                    bgColor: '#222',
                    imgUrl: 'https://res.cloudinary.com/dubjerksn/image/upload/v1642885717/Notello/template4_avwoqv.jpg'
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
                                _id: 't200',
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
                                members: [
                                    {
                                        _id: "u101",
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: "u102",
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
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
                                _id: 't300',
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
            },{
                _id: 'b102',
                title: 'Board2',
                createdAt: Date.now(),
                createdBy: {
                    _id: 'u101',
                    fullname: "Netanel C",
                    imgUrl: ""
                },
                style: {
                    bgColor: '#fff',
                    imgUrl: 'https://res.cloudinary.com/dubjerksn/image/upload/v1642888319/Notello/a0992afa9c1f2b47db51d11f69c897f3_f3gwtp.jpg'
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
                        _id: 'g102',
                        title: 'Group 1',
                        dueDate: 1826212211,
                        style: {
                            bgColor: '#f2f3'
                        },
                        tasks: [{
                                _id: 't201',
                                title: 'Important stuff',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#8E806A'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#F0BB62'
                                    }
                                ],
                                members: [
                                    {
                                        _id: "u101",
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: "u102",
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
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
                                _id: 't300',
                                title: 'Efraim Likes Lasagna',
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
                                title: 'Master Juggling',
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
                                title: 'Stack Overflow',
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
            } ]
            pathToStorage.saveToStorage(STORAGE_KEY, gBoards);
            return gBoards;
        } catch (err) {
            console.log('Cant load boards');
            throw new Error(err);
        }
    }
}

async function addTask(boardId, groupId, task, activity = '') {
    task._id = utilService.makeId()
    try {
        let board = await getBoardById(boardId)
        const groupIdx = getGroupIdxById(board, groupId)
        board.groups[groupIdx].tasks.push(task);
        board.activities.unshift(activity)
        const updatedBoard = await saveBoard(board)
        return updatedBoard
    } catch (err) {
        console.log(`Cant add task to board`);
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
    group._id = utilService.makeId()
    group.tasks = [];
    try {
        let board = await getBoardById(boardId)
        board.groups.push(group)
        board.activities.unshift(activity)
        const updatedBoard = saveBoard(board)
        return updatedBoard
    } catch (err) {
        console.log(`Cant add group to board`);
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

function getGroupsIds(board) {
    var groupsIds = [] 
    groupsIds = board.groups.map((group) => { 
        return group._id
    })
    console.log("groupsIds: ", groupsIds);
    return groupsIds
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
    // debugger
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