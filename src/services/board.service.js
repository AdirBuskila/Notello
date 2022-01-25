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
}

const STORAGE_KEY = 'board_DB'
var gBoards;

_createBoards()

async function _createBoards() {
    gBoards = pathToStorage.loadFromStorage(STORAGE_KEY) || []
    if (!gBoards || gBoards.length === 0) {
        try {
            gBoards = [
                {
                _id: utilService.makeId(),
                title: 'First Board',
                createdAt: Date.now(),
                createdBy: {
                    _id: utilService.makeId(),
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
                    _id: utilService.makeId(),
                    fullname: 'Adir adir',
                    imgUrl: ''
                }],
                groups: [
                    {
                        _id: utilService.makeId(),
                        title: 'Group 1',
                        dueDate: 1826212211,
                        style: {
                            bgColor: '#f2f3'
                        },
                        tasks: [
                            {
                                _id: utilService.makeId(),
                                title: 'Learn to Cook',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#51e879'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#51e8d9'
                                    }
                                ],
                                checklists: [{
                                    _id: utilService.makeId(),
                                    title: 'Checklist',
                                    todos: [{
                                        _id: utilService.makeId(),
                                        title: 'Fly to the moon',
                                        isDone: true
                                    }]
                                },
                                {
                                    _id: utilService.makeId(),
                                    title: 'Checklist',
                                    todos: [{
                                        _id: utilService.makeId(),
                                        title: 'Build the best Trello!',
                                        isDone: true
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Build the best Trello!',
                                        isDone: true
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Build the best Trello!',
                                        isDone: true
                                    }]
                                }],
                                attachments: [],
                                description: 'important',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: 'm102',
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },{
                                _id: utilService.makeId(),
                                title: 'Learn about the pyramids',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#e9f062'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#b0285a'
                                    }
                                ],
                                dueDate: [],
                                checklists: [
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'To Do 1',
                                            isDone: false
                                        }]
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'To Do 2',
                                            isDone: false
                                        }]
                                    }
                                ],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Barney",
                                        fullname: "Barney Stinson",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1643022678/Notello/barney_fs8vju.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dwight",
                                        fullname: "Dwight Schrute",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1643022679/Notello/dwight_vuc6ll.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    id: utilService.makeId(),
                                    txt: 'Maybe well find some Mummies 👀',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },{
                                _id: utilService.makeId(),
                                title: 'Gurevich loves scrolling (specially Y axis)',
                                attachments: [{
                                        _id: utilService.makeId(),
                                        txt: 'Wuba La Dub Dub',
                                        url: 'https://cdn.europosters.eu/image/750/posters/rick-and-morty-watch-i50046.jpg',
                                        createdAt: 1642950358371,
                                    }],
                                labels: [{
                                        name: 'Work',
                                        bgc: '#8E806A'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#F0BB62'
                                    }
                                ],
                                dueDate: [],
                                checklists: [
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'Do this',
                                            isDone: false
                                        }]
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'Do that',
                                            isDone: false
                                        }]
                                    }
                                ],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },
                            {
                                _id: utilService.makeId(),
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
                                dueDate: [],
                                members: [],
                                comments: [],
                                attachments: [],
                                description: '',
                                createdAt: Date.now(),
                                checklists: [{
                                    _id: utilService.makeId(),
                                    title: 'Checklist',
                                    todos: [{
                                        _id: utilService.makeId(),
                                        title: 'To Do 1',
                                        isDone: false
                                    }]
                                }],
                            }
                        ]
                    },
                    {
                        _id: utilService.makeId(),
                        title: 'Group II',
                        dueDate: 1846712211,
                        style: {
                            bgColor: '#ee3'
                        },
                        tasks: [
                            {
                                _id: utilService.makeId(),
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
                                dueDate: [],
                                checklists: [
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'Click me!',
                                            isDone: false
                                        }]
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'Please!',
                                            isDone: false
                                        }]
                                    }
                                ],
                                members: [],
                                attachments: [],
                                description: '',
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },
                            {
                                _id: utilService.makeId(),
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
                                dueDate: [],
                                comments: [],
                                attachments: [],
                                description: '',
                                members: [],
                                createdAt: Date.now(),
                                checklists: [{
                                    _id: utilService.makeId(),
                                    title: 'Checklist2',
                                    todos: [{
                                        _id: utilService.makeId(),
                                        title: 'To Do 2',
                                        isDone: true
                                    }]
                                }],
                            }
                        ],
                    },
                    {
                        _id: utilService.makeId(),
                        title: 'Casual',
                        dueDate: 1826212211,
                        style: {
                            bgColor: '#f2f3'
                        },
                        tasks: [
                            {
                                _id: utilService.makeId(),
                                title: 'Learning to ride Bicycle',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#51e879'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#51e8d9'
                                    }
                                ],
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Barney",
                                        fullname: "Barney Stinson",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1643022678/Notello/barney_fs8vju.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dwight",
                                        fullname: "Dwight Schrute",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1643022679/Notello/dwight_vuc6ll.png"
                                    }
                                ],
                                checklists: [
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'Im a todo!',
                                            isDone: false
                                        }]
                                    }
                                ],
                                attachments: [],
                                description: '',
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                },{
                                    _id: utilService.makeId(),
                                    txt: 'Are you Sure?',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Adir B',
                                        imgUrl: ''
                                    }
                                }],
                            },{
                                _id: utilService.makeId(),
                                title: 'Learn about the pyramids',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#e9f062'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#b0285a'
                                    }
                                ],
                                dueDate: [],
                                checklists: [
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'Im a todo!',
                                            isDone: false
                                        }]
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'Im a todo!',
                                            isDone: false
                                        }]
                                    }
                                ],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    id: utilService.makeId(),
                                    txt: 'Maybe well find some Mummies 👀',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },{
                                _id: utilService.makeId(),
                                title: 'Most Powerful Programming Language',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#f2a28a'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#de9fe0'
                                    }
                                ],
                                dueDate: [],
                                checklists: [
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'Im a todo!',
                                            isDone: false
                                        }]
                                    }
                                ],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Barney",
                                        fullname: "Barney Stinson",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1643022678/Notello/barney_fs8vju.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dwight",
                                        fullname: "Dwight Schrute",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1643022679/Notello/dwight_vuc6ll.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },
                            {
                                _id: utilService.makeId(),
                                title: 'Milky Way',
                                labels: [{
                                        name: 'Special',
                                        bgc: '#F999B7'
                                    },
                                    {
                                        name: 'Work',
                                        bgc: '#8E806A'
                                    }
                                ],
                                dueDate: [],
                                members: [],
                                comments: [],
                                attachments: [],
                                description: '',
                                createdAt: Date.now(),
                                checklists: [{
                                    _id: utilService.makeId(),
                                    title: 'Checklist',
                                    todos: [{
                                        _id: utilService.makeId(),
                                        title: 'To Do 1',
                                        isDone: false
                                    }]
                                }],
                            }
                        ]
                    },{
                        _id: utilService.makeId(),
                        title: 'Important Stuff',
                        dueDate: 1826212211,
                        style: {
                            bgColor: '#f2f3'
                        },
                        tasks: [
                            {
                                _id: utilService.makeId(),
                                title: 'Checking if the moon landing was real',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#51e879'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#51e8d9'
                                    }
                                ],
                                dueDate: [],
                                checklists: [
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'Im a todo!',
                                            isDone: false
                                        }]
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'Im a todo!',
                                            isDone: false
                                        }]
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'Im a todo!',
                                            isDone: false
                                        }]
                                    }
                                ],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },{
                                _id: utilService.makeId(),
                                title: 'Hakuna Matata',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#e8749f'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#b48aeb'
                                    }
                                ],
                                checklists: [
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'New New New!',
                                            isDone: false
                                        }]
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'Old Old Old!',
                                            isDone: false
                                        }]
                                    }
                                ],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Barney",
                                        fullname: "Barney Stinson",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1643022678/Notello/barney_fs8vju.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dwight",
                                        fullname: "Dwight Schrute",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1643022679/Notello/dwight_vuc6ll.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },{
                                _id: utilService.makeId(),
                                title: 'List all the problems',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#8E806A'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#F0BB62'
                                    }
                                ],
                                dueDate: [],
                                checklists: [
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'New New New!',
                                            isDone: false
                                        }]
                                    }
                                ],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },
                            {
                                _id: utilService.makeId(),
                                title: 'Coldplay concert at Feb',
                                labels: [{
                                        name: 'Special',
                                        bgc: '#F999B7'
                                    },
                                    {
                                        name: 'Work',
                                        bgc: '#8E806A'
                                    }
                                ],
                                dueDate: [],
                                members: [],
                                attachments: [],
                                description: '',
                                comments: [],
                                createdAt: Date.now(),
                                checklists: [{
                                    _id: utilService.makeId(),
                                    title: 'Checklist',
                                    todos: [{
                                        _id: utilService.makeId(),
                                        title: 'To Do 1',
                                        isDone: false
                                    }]
                                },
                                {
                                    _id: utilService.makeId(),
                                    title: 'Checklist',
                                    todos: [{
                                        _id: utilService.makeId(),
                                        title: 'To Do 2',
                                        isDone: true
                                    }]
                                }],
                            }
                        ],
                    },
                ],
                activities: [{
                    _id: utilService.makeId(),
                    txt: 'Changed Color',
                    createdAt: 1545212324,
                    byMember: {
                        _id: utilService.makeId(),
                        fullname: "Adir B",
                        imgUrl: ""
                    },
                    task: {
                        _id: utilService.makeId(),
                        title: 'Notello'
                    }
                }]
            },
            {
                _id: utilService.makeId(),
                title: 'Casual',
                createdAt: Date.now(),
                createdBy: {
                    _id: utilService.makeId(),
                    fullname: "Adir B",
                    imgUrl: ""
                },
                style: {
                    bgColor: '#222',
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
                    _id: utilService.makeId(),
                    fullname: 'Adir adir',
                    imgUrl: ''
                }],
                groups: [
                    {
                        _id: utilService.makeId(),
                        title: 'Group 1',
                        dueDate: 1826212211,
                        style: {
                            bgColor: '#f2f3'
                        },
                        tasks: [
                            {
                                _id: utilService.makeId(),
                                title: 'Learn to Cook',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#51e879'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#51e8d9'
                                    }
                                ],
                                dueDate: [],
                                checklists: [
                                    {
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'New New New!',
                                            isDone: false
                                        }]
                                    }
                                ],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: 'm102',
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },{
                                _id: utilService.makeId(),
                                title: 'Learn about the pyramids',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#e9f062'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#b0285a'
                                    }
                                ],
                                dueDate: [],
                                checklists: [],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    id: utilService.makeId(),
                                    txt: 'Maybe well find some Mummies 👀',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },{
                                _id: utilService.makeId(),
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
                                dueDate: [],
                                checklists: [],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },
                            {
                                _id: utilService.makeId(),
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
                                dueDate: [],
                                members: [],
                                attachments: [],
                                description: '',
                                comments: [],
                                createdAt: Date.now(),
                                checklists: [{
                                    _id: utilService.makeId(),
                                    title: 'Checklist',
                                    todos: [{
                                        _id: utilService.makeId(),
                                        title: 'To Do 1',
                                        isDone: false
                                    }]
                                }],
                            }
                        ]
                    },
                    {
                        _id: utilService.makeId(),
                        title: 'Group II',
                        dueDate: 1846712211,
                        style: {
                            bgColor: '#ee3'
                        },
                        tasks: [{
                                _id: utilService.makeId(),
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
                                dueDate: [],
                                checklists: [],
                                members: [],
                                attachments: [],
                                description: '',
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },
                            {
                                _id: utilService.makeId(),
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
                                dueDate: [],
                                members: [],
                                comments: [],
                                attachments: [],
                                description: '',
                                createdAt: Date.now(),
                                checklists: [{
                                    _id: utilService.makeId(),
                                    title: 'Checklist2',
                                    todos: [{
                                        _id: utilService.makeId(),
                                        title: 'To Do 2',
                                        isDone: true
                                    }]
                                }],
                            }
                        ],
                    },
                    {
                        _id: utilService.makeId(),
                        title: 'Casual',
                        dueDate: 1826212211,
                        style: {
                            bgColor: '#f2f3'
                        },
                        tasks: [
                            {
                                _id: utilService.makeId(),
                                title: 'Learning to ride Bicycle',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#51e879'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#51e8d9'
                                    }
                                ],
                                dueDate: [],
                                checklists: [],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                },{
                                    _id: utilService.makeId(),
                                    txt: 'Are you Sure?',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Adir B',
                                        imgUrl: ''
                                    }
                                }],
                            },{
                                _id: utilService.makeId(),
                                title: 'Learn about the pyramids',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#e9f062'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#b0285a'
                                    }
                                ],
                                dueDate: [],
                                checklists: [],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    id: utilService.makeId(),
                                    txt: 'Maybe well find some Mummies 👀',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },{
                                _id: utilService.makeId(),
                                title: 'Most Powerful Programming ',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#f2a28a'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#de9fe0'
                                    }
                                ],
                                dueDate: [],
                                checklists: [],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },
                            {
                                _id: utilService.makeId(),
                                title: 'Milky Way',
                                labels: [{
                                        name: 'Special',
                                        bgc: '#F999B7'
                                    },
                                    {
                                        name: 'Work',
                                        bgc: '#8E806A'
                                    }
                                ],
                                dueDate: [],
                                members: [],
                                attachments: [],
                                description: '',
                                comments: [],
                                createdAt: Date.now(),
                                checklists: [{
                                    _id: utilService.makeId(),
                                    title: 'Checklist',
                                    todos: [{
                                        _id: utilService.makeId(),
                                        title: 'To Do 1',
                                        isDone: false
                                    }]
                                }],
                            }
                        ]
                    },{
                        _id: utilService.makeId(),
                        title: 'Important Stuff',
                        dueDate: 1826212211,
                        style: {
                            bgColor: '#f2f3'
                        },
                        tasks: [
                            {
                                _id: utilService.makeId(),
                                title: 'Checking if the moon landing was real',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#51e879'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#51e8d9'
                                    }
                                ],
                                dueDate: [],
                                checklists: [],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },{
                                _id: utilService.makeId(),
                                title: 'Hakuna Matata',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#e8749f'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#b48aeb'
                                    }
                                ],
                                dueDate: [],
                                checklists: [],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },{
                                _id: utilService.makeId(),
                                title: 'List all the problems',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#8E806A'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#F0BB62'
                                    }
                                ],
                                dueDate: [],
                                checklists: [],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },
                            {
                                _id: utilService.makeId(),
                                title: 'Coldplay concert at Feb',
                                labels: [{
                                        name: 'Special',
                                        bgc: '#F999B7'
                                    },
                                    {
                                        name: 'Work',
                                        bgc: '#8E806A'
                                    }
                                ],
                                dueDate: [],
                                members: [],
                                attachments: [],
                                description: '',
                                comments: [],
                                createdAt: Date.now(),
                                checklists: [{
                                    _id: utilService.makeId(),
                                    title: 'Checklist',
                                    todos: [{
                                        _id: utilService.makeId(),
                                        title: 'To Do 1',
                                        isDone: false
                                    }]
                                }],
                            }
                        ],
                    },
                ],
                activities: [{
                    _id: utilService.makeId(),
                    txt: 'Changed Color',
                    createdAt: 1545212324,
                    byMember: {
                        _id: utilService.makeId(),
                        fullname: "Adir B",
                        imgUrl: ""
                    },
                    task: {
                        _id: utilService.makeId(),
                        title: 'Notello'
                    }
                }]
            },
            {
                _id: utilService.makeId(),
                title: 'Trip to Japan',
                createdAt: Date.now(),
                createdBy: {
                    _id: utilService.makeId(),
                    fullname: "Nati G",
                    imgUrl: ""
                },
                style: {
                    bgColor: '#222',
                    imgUrl: 'https://res.cloudinary.com/dubjerksn/image/upload/v1643021447/Notello/136667-japanese-desktop-wallpaper-top-free-japanese-desktop_exakwe.jpg'
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
                    _id: utilService.makeId(),
                    fullname: 'Adir adir',
                    imgUrl: ''
                }],
                groups: [
                    {
                        _id: utilService.makeId(),
                        title: 'Group 1',
                        dueDate: 1826212211,
                        style: {
                            bgColor: '#f2f3'
                        },
                        tasks: [
                            {
                                _id: utilService.makeId(),
                                title: 'Learn to Cook',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#51e879'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#51e8d9'
                                    }
                                ],
                                dueDate: [],
                                checklists: [],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: 'm102',
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },{
                                _id: utilService.makeId(),
                                title: 'Learn about the pyramids',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#e9f062'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#b0285a'
                                    }
                                ],
                                dueDate: [],
                                checklists: [],
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                attachments: [],
                                description: '',
                                createdAt: Date.now(),
                                comments: [{
                                    id: utilService.makeId(),
                                    txt: 'Maybe well find some Mummies 👀',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },{
                                _id: utilService.makeId(),
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
                                dueDate: [],
                                checklists: [],
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                attachments: [],
                                description: '',
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },
                            {
                                _id: utilService.makeId(),
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
                                dueDate: [],
                                members: [],
                                attachments: [],
                                description: '',
                                comments: [],
                                createdAt: Date.now(),
                                checklists: [{
                                    _id: utilService.makeId(),
                                    title: 'Checklist',
                                    todos: [{
                                        _id: utilService.makeId(),
                                        title: 'To Do 1',
                                        isDone: false
                                    }]
                                }],
                            }
                        ]
                    },
                    {
                        _id: utilService.makeId(),
                        title: 'Group II',
                        dueDate: 1846712211,
                        style: {
                            bgColor: '#ee3'
                        },
                        tasks: [{
                                _id: utilService.makeId(),
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
                                dueDate: [],
                                checklists: [],
                                members: [],
                                attachments: [],
                                description: '',
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },
                            {
                                _id: utilService.makeId(),
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
                                dueDate: [],
                                members: [],
                                attachments: [],
                                description: '',
                                comments: [],
                                createdAt: Date.now(),
                                checklists: [{
                                    _id: utilService.makeId(),
                                    title: 'Checklist2',
                                    todos: [{
                                        _id: utilService.makeId(),
                                        title: 'To Do 2',
                                        isDone: true
                                    }]
                                }],
                            }
                        ],
                    },
                    {
                        _id: utilService.makeId(),
                        title: 'Casual',
                        dueDate: 1826212211,
                        style: {
                            bgColor: '#f2f3'
                        },
                        tasks: [
                            {
                                _id: utilService.makeId(),
                                title: 'Learning to ride Bicycle',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#51e879'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#51e8d9'
                                    }
                                ],
                                dueDate: [],
                                checklists: [],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                },{
                                    _id: utilService.makeId(),
                                    txt: 'Are you Sure?',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Adir B',
                                        imgUrl: ''
                                    }
                                }],
                            },{
                                _id: utilService.makeId(),
                                title: 'Learn about the pyramids',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#e9f062'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#b0285a'
                                    }
                                ],
                                dueDate: [],
                                checklists: [],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    id: utilService.makeId(),
                                    txt: 'Maybe well find some Mummies 👀',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },{
                                _id: utilService.makeId(),
                                title: 'Most Powerful Programming ',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#f2a28a'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#de9fe0'
                                    }
                                ],
                                dueDate: [],
                                checklists: [],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },
                            {
                                _id: utilService.makeId(),
                                title: 'Milky Way',
                                labels: [{
                                        name: 'Special',
                                        bgc: '#F999B7'
                                    },
                                    {
                                        name: 'Work',
                                        bgc: '#8E806A'
                                    }
                                ],
                                dueDate: [],
                                members: [],
                                attachments: [],
                                description: '',
                                comments: [],
                                createdAt: Date.now(),
                                checklists: [{
                                    _id: utilService.makeId(),
                                    title: 'Checklist',
                                    todos: [{
                                        _id: utilService.makeId(),
                                        title: 'To Do 1',
                                        isDone: false
                                    }]
                                }],
                            }
                        ]
                    },{
                        _id: utilService.makeId(),
                        title: 'Important Stuff',
                        dueDate: 1826212211,
                        style: {
                            bgColor: '#f2f3'
                        },
                        tasks: [
                            {
                                _id: utilService.makeId(),
                                title: 'Checking if the moon landing was real',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#51e879'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#51e8d9'
                                    }
                                ],
                                dueDate: [],
                                checklists: [],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },{
                                _id: utilService.makeId(),
                                title: 'Hakuna Matata',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#e8749f'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#b48aeb'
                                    }
                                ],
                                dueDate: [],
                                checklists: [],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },{
                                _id: utilService.makeId(),
                                title: 'List all the problems',
                                labels: [{
                                        name: 'Work',
                                        bgc: '#8E806A'
                                    },
                                    {
                                        name: 'Relavent',
                                        bgc: '#F0BB62'
                                    }
                                ],
                                dueDate: [],
                                checklists: [],
                                attachments: [],
                                description: '',
                                members: [
                                    {
                                        _id: utilService.makeId(),
                                        username: "Rick",
                                        fullname: "Rick Sanchez",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860696/Notello/rick_aadonv.png"
                                    },
                                    {
                                        _id: utilService.makeId(),
                                        username: "Dumbledore",
                                        fullname: "Albus Dumbledore",
                                        imgUrl: "https://res.cloudinary.com/dubjerksn/image/upload/v1642860790/Notello/dumbeldore_wz43lk.png"
                                    }
                                ],
                                createdAt: Date.now(),
                                comments: [{
                                    _id: utilService.makeId(),
                                    txt: 'We are changing the json',
                                    createdAt: Date.now(),
                                    byMember: {
                                        _id: utilService.makeId(),
                                        fullname: 'Netanel G',
                                        imgUrl: ''
                                    }
                                }],
                            },
                            {
                                _id: utilService.makeId(),
                                title: 'Coldplay concert at Feb',
                                labels: [{
                                        name: 'Special',
                                        bgc: '#F999B7'
                                    },
                                    {
                                        name: 'Work',
                                        bgc: '#8E806A'
                                    }
                                ],
                                dueDate: [],
                                members: [],
                                attachments: [],
                                description: '',
                                comments: [],
                                createdAt: Date.now(),
                                checklists: [{
                                    _id: utilService.makeId(),
                                    title: 'Checklist',
                                    todos: [{
                                        _id: utilService.makeId(),
                                        title: 'To Do 1',
                                        isDone: false
                                    }]
                                }],
                            }
                        ],
                    },
                ],
                activities: [{
                    _id: utilService.makeId(),
                    txt: 'Changed Color',
                    createdAt: 1545212324,
                    byMember: {
                        _id: utilService.makeId(),
                        fullname: "Adir B",
                        imgUrl: ""
                    },
                    task: {
                        _id: utilService.makeId(),
                        title: 'Notello'
                    }
                }]
            }
        ]
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
    task.labels = (task.labels) ? task.labels: [];
    task.attachments = (task.attachments) ? task.attachments: [];
    task.comments = (task.comments) ? task.comments: [];
    task.description = (task.description) ? task.description: '';
    task.checklists = (task.checklists) ? task.checklists: [];
    task.members = (task.members) ? task.members: [];
    task.dueDate = (task.dueDate) ? task.dueDate: [];
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
    return groupsIds
}

async function addLabel(label, boardId, groupId, taskId, activity) {
    label._id = utilService.makeId()
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

    const _idx = board.groups.findIndex(group => {
        return (group._id === groupId)
    })
    return _idx;
}

async function getTaskIdxById(board, groupId, taskId) {
    console.log('IM HEREEEEEEEE');
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

async function addAttachment(attachment, boardId, groupId, taskId, activity) {
    attachment._id = utilService.makeId()
    if (!attachment.name) attachment.name = 'New Attachment' 
    try {
        let board = await getBoardById(boardId)
        const groupIdx = getGroupIdxById(board, groupId)
        const taskIdx = getTaskIdxById(board, groupId, taskId)
        /////
        board.groups[groupIdx].tasks[taskIdx].push(attachment)
        board.activities.unshift(activity)
        const updatedBoard = saveBoard(board)
        return updatedBoard



    } catch (err) {
        console.log('cannot add attachment', err);
    }

}

function getGroup(board,taskId) {
    console.log("taskId !!!!!!: ", taskId);
    console.log("board !!!!!!: ", board);
    const group = board.groups.filter((group) => {
        return group.tasks.find((currTask) => {
            return currTask._id === taskId
        })
    })
    return group[0]
}

function getTask(board, taskId) {
    console.log("taskId in service: ", taskId); 
    console.log("board in service: ", board);
    const group = getGroup(board,taskId)
    const task = group.tasks.find((currTask)=>{
        return (currTask._id === taskId)
    })
    console.log(task,'task in SERVICE!!!');
    return task
}

// async function addLabel(label, boardId, groupId, taskId, activity) {
//     label._id = utilService.makeId()
//     try {
//         let board = await getBoardById(boardId)
//         const groupIdx = getGroupIdxById(board, groupId)
//         const taskIdx = getTaskIdxById(board, groupId, taskId)
//         board.groups[groupIdx].tasks[taskIdx].labels.push(label)
//         board.activities.unshift(activity)
//         const updatedBoard = saveBoard(board)
//         return updatedBoard
//     } catch (err) {
//         console.log(`Cant add label to ${taskId}`);
//     }
// }