import { storageService } from './async-storage.service.js'
import { pathToStorage } from '../storage.service.js'
import { utilService } from '../util.service.js'


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
    getMemberById,
}

const STORAGE_KEY = 'board_DB'
var gBoards;

_createBoards()

async function _createBoards() {
    gBoards = pathToStorage.loadFromStorage(STORAGE_KEY) || []
    if (!gBoards || gBoards.length === 0) {
        try {
            gBoards = [{
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
                        _id: 'ABAB123123',
                        fullname: 'Adir Buskila',
                        username: 'busi',
                        imgUrl: 'https://res.cloudinary.com/dubjerksn/image/upload/v1643131869/Notello/AB_pplonl.png'
                    }, {
                        _id: 'NGNG123123',
                        fullname: 'Nati Gurevich',
                        username: 'natiG4',
                        imgUrl: 'https://res.cloudinary.com/dubjerksn/image/upload/v1643131873/Notello/NG_e1fglp.png'
                    }, {
                        _id: 'NCNC123123',
                        fullname: 'Nati Cohen',
                        username: 'natiC',

                        imgUrl: 'https://res.cloudinary.com/dubjerksn/image/upload/v1643131867/Notello/NC_foadck.png'
                    }, {
                        _id: 'IGIG123123',
                        fullname: 'Ilai Greco',
                        username: 'ilaiG',
                        imgUrl: 'https://res.cloudinary.com/dubjerksn/image/upload/v1643212002/Notello/T02BJ4W8H45-U02E0QXA9PD-8469fc199211-512_a1jdtm.jpg'
                    }],
                    groups: [{
                            _id: utilService.makeId(),
                            title: 'Group 1',
                            dueDate: 1826212211,
                            style: {
                                bgColor: '#f2f3'
                            },
                            tasks: [{
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
                                    cover: {
                                        background: '#f5dd29',
                                        spread: 'full'
                                    },
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
                                            cover: {
                                                background: '#feae3f',
                                                spread: 'partial'
                                            },
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
                                                }
                                            ]
                                        }
                                    ],
                                    dueDate: [],
                                    attachments: [],
                                    description: 'important',
                                    members: [{
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
                                }, {
                                    _id: utilService.makeId(),
                                    title: 'Learn about the pyramids',
                                    cover: {
                                        background: '#ee7564',
                                        spread: 'partial'
                                    },
                                    labels: [{
                                            name: 'Work',
                                            bgc: '#e9f062'
                                        },
                                        {
                                            name: 'Relavent',
                                            bgc: '#b0285a'
                                        }
                                    ],
                                    dueDate: [{ date: "2022-01-25T00:00:00.000Z", isDone: false }],
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
                                                isDone: false
                                            }]
                                        }
                                    ],
                                    attachments: [],
                                    description: '',
                                    members: [{
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
                                        txt: 'Maybe well find some Mummies ????',
                                        createdAt: Date.now(),
                                        byMember: {
                                            _id: utilService.makeId(),
                                            fullname: 'Netanel G',
                                            imgUrl: ''
                                        }
                                    }],
                                }, {
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
                                    checklists: [{
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
                                    members: [{
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
                                    cover: {
                                        background: '#cd8de5',
                                        spread: 'partial'
                                    },
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
                                }, {
                                    _id: utilService.makeId(),
                                    cover: {
                                        background: 'https://images.jumpseller.com/store/hercules-it-llc/10188702/Nutella.jpg?1623999446',
                                        spread: 'partial'
                                    },
                                    title: 'Buy Some Nutella',
                                    labels: [{
                                            name: 'Important',
                                            bgc: '#F569B7'
                                        },
                                        {
                                            name: 'Food',
                                            bgc: '#82306A'
                                        }
                                    ],
                                    dueDate: [],
                                    members: [],
                                    comments: [],
                                    attachments: [{
                                        _id: utilService.makeId(),
                                        txt: 'Nutella',
                                        url: 'https://images.jumpseller.com/store/hercules-it-llc/10188702/Nutella.jpg?1623999446',
                                        createdAt: Date.now()
                                    }],
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
                                    checklists: [{
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
                                    cover: {
                                        background: 'https://res.cloudinary.com/dubjerksn/image/upload/v1643154516/Notello/Screenshot_5_k3jvza.png',
                                        spread: 'partial'
                                    },
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
                            tasks: [{
                                    _id: utilService.makeId(),
                                    cover: {
                                        background: '#ee7564',
                                        spread: 'partial'
                                    },
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
                                    members: [{
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
                                    checklists: [{
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'Im a todo!',
                                            isDone: false
                                        }]
                                    }],
                                    dueDate: [{ date: "2022-02-27T00:00:00.000Z", isDone: true }],
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
                                    }, {
                                        _id: utilService.makeId(),
                                        txt: 'Are you Sure?',
                                        cover: {
                                            background: '#5ba4cf',
                                            spread: 'partial'
                                        },
                                        createdAt: Date.now(),
                                        byMember: {
                                            _id: utilService.makeId(),
                                            fullname: 'Adir B',
                                            imgUrl: ''
                                        }
                                    }],
                                }, {
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
                                    cover: {
                                        background: 'https://res.cloudinary.com/dubjerksn/image/upload/v1643158771/Notello/egypt-cairo-pyramids-of-giza-and-camels-2_s36zt6.jpg',
                                        spread: 'partial'
                                    },
                                    dueDate: [],
                                    checklists: [{
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
                                    members: [{
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
                                        txt: 'Maybe well find some Mummies ????',
                                        createdAt: Date.now(),
                                        byMember: {
                                            _id: utilService.makeId(),
                                            fullname: 'Netanel G',
                                            imgUrl: ''
                                        }
                                    }],
                                }, {
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
                                    checklists: [{
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'Im a todo!',
                                            isDone: false
                                        }]
                                    }],
                                    attachments: [],
                                    description: '',
                                    members: [{
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
                        }, {
                            _id: utilService.makeId(),
                            title: 'Important Stuff',
                            dueDate: 1826212211,
                            style: {
                                bgColor: '#f2f3'
                            },
                            tasks: [{
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
                                    checklists: [{
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
                                    members: [{
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
                                }, {
                                    _id: utilService.makeId(),
                                    title: 'Fixing all the bugs',
                                    labels: [{
                                            name: 'Work',
                                            bgc: '#51e879'
                                        },
                                        {
                                            name: 'Relavent',
                                            bgc: '#51e8d9'
                                        }
                                    ],
                                    cover: {
                                        background: 'https://c.tenor.com/9ItR8nSuxE0AAAAC/thumbs-up-computer.gif',
                                        spread: 'partial'
                                    },
                                    dueDate: [],
                                    checklists: [{
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
                                    members: [{
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
                                        txt: 'Gotta fix them all!',
                                        createdAt: Date.now(),
                                        byMember: {
                                            _id: utilService.makeId(),
                                            fullname: 'Netanel G',
                                            imgUrl: ''
                                        }
                                    }],
                                }, {
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
                                    checklists: [{
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
                                    dueDate: [],
                                    attachments: [],
                                    description: '',
                                    members: [{
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
                                }, {
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
                                    checklists: [{
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'New New New!',
                                            isDone: false
                                        }]
                                    }],
                                    attachments: [],
                                    description: '',
                                    members: [{
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
                                        }
                                    ],
                                }, {
                                    _id: utilService.makeId(),
                                    title: 'Explore The Solar System',
                                    labels: [{
                                            name: 'Special',
                                            bgc: '#F669B7'
                                        },
                                        {
                                            name: 'Work',
                                            bgc: '#87806A'
                                        }
                                    ],
                                    cover: {
                                        background: 'https://res.cloudinary.com/dubjerksn/image/upload/v1643160390/Notello/6baa4d7703d0f76d0347acfae3a3fa8a_fsazsd.gif',
                                        spread: 'partial'
                                    },
                                    dueDate: [],
                                    members: [],
                                    attachments: [],
                                    description: '',
                                    comments: [],
                                    createdAt: Date.now(),
                                    checklists: [],
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
                        fullname: "Netanel C",
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
                    groups: [{
                            _id: utilService.makeId(),
                            title: 'Group 1',
                            dueDate: 1826212211,
                            style: {
                                bgColor: '#f2f3'
                            },
                            tasks: [{
                                    _id: utilService.makeId(),
                                    title: 'Learn to Cook',
                                    cover: {
                                        background: '#5ba4cf',
                                        spread: 'full'
                                    },
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
                                                }
                                            ]
                                        }
                                    ],
                                    dueDate: [],
                                    attachments: [],
                                    description: 'important',
                                    members: [{
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
                                }, {
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
                                    dueDate: [{ date: "2022-01-25T00:00:00.000Z", isDone: false }],
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
                                                isDone: false
                                            }]
                                        }
                                    ],
                                    attachments: [],
                                    description: '',
                                    members: [{
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
                                        txt: 'Maybe well find some Mummies ????',
                                        createdAt: Date.now(),
                                        byMember: {
                                            _id: utilService.makeId(),
                                            fullname: 'Netanel G',
                                            imgUrl: ''
                                        }
                                    }],
                                }, {
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
                                    checklists: [{
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
                                    members: [{
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
                                }, {
                                    _id: utilService.makeId(),
                                    title: 'Buy Some Nutella',
                                    labels: [{
                                            name: 'Important',
                                            bgc: '#F569B7'
                                        },
                                        {
                                            name: 'Food',
                                            bgc: '#82306A'
                                        }
                                    ],
                                    dueDate: [],
                                    members: [],
                                    comments: [],
                                    attachments: [{
                                        _id: utilService.makeId(),
                                        txt: 'Nutella',
                                        url: 'https://images.jumpseller.com/store/hercules-it-llc/10188702/Nutella.jpg?1623999446',
                                        createdAt: Date.now()
                                    }],
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
                            tasks: [{
                                    _id: utilService.makeId(),
                                    title: 'Waiting for ilai!',
                                    cover: {
                                        background: '#ff8ed4',
                                        spread: 'full'
                                    },
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
                                    checklists: [{
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
                            tasks: [{
                                    _id: utilService.makeId(),
                                    cover: {
                                        background: '#ff8ed4',
                                        spread: 'full'
                                    },
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
                                    members: [{
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
                                    checklists: [{
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'Im a todo!',
                                            isDone: false
                                        }]
                                    }],
                                    dueDate: [],
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
                                    }, {
                                        _id: utilService.makeId(),
                                        txt: 'Are you Sure?',
                                        createdAt: Date.now(),
                                        byMember: {
                                            _id: utilService.makeId(),
                                            fullname: 'Adir B',
                                            imgUrl: ''
                                        }
                                    }],
                                }, {
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
                                    checklists: [{
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
                                    members: [{
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
                                        txt: 'Maybe well find some Mummies ????',
                                        createdAt: Date.now(),
                                        byMember: {
                                            _id: utilService.makeId(),
                                            fullname: 'Netanel G',
                                            imgUrl: ''
                                        }
                                    }],
                                }, {
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
                                    checklists: [{
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'Im a todo!',
                                            isDone: false
                                        }]
                                    }],
                                    attachments: [],
                                    description: '',
                                    members: [{
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
                        }, {
                            _id: utilService.makeId(),
                            title: 'Important Stuff',
                            dueDate: 1826212211,
                            style: {
                                bgColor: '#f2f3'
                            },
                            tasks: [{
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
                                    checklists: [{
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
                                    members: [{
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
                                }, {
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
                                    checklists: [{
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
                                    dueDate: [],
                                    attachments: [],
                                    description: '',
                                    members: [{
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
                                }, {
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
                                    checklists: [{
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'New New New!',
                                            isDone: false
                                        }]
                                    }],
                                    attachments: [],
                                    description: '',
                                    members: [{
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
                                        }
                                    ],
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
                    title: 'Trip To Japan',
                    createdAt: Date.now(),
                    createdBy: {
                        _id: utilService.makeId(),
                        fullname: "Netanel C",
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
                    groups: [{
                            _id: utilService.makeId(),
                            title: 'Group 1',
                            dueDate: 1826212211,
                            style: {
                                bgColor: '#f2f3'
                            },
                            tasks: [{
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
                                                }
                                            ]
                                        }
                                    ],
                                    dueDate: [],
                                    attachments: [],
                                    description: 'important',
                                    members: [{
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
                                }, {
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
                                    dueDate: [{ date: "2022-01-25T00:00:00.000Z", isDone: false }],
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
                                                isDone: false
                                            }]
                                        }
                                    ],
                                    attachments: [],
                                    description: '',
                                    members: [{
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
                                        txt: 'Maybe well find some Mummies ????',
                                        createdAt: Date.now(),
                                        byMember: {
                                            _id: utilService.makeId(),
                                            fullname: 'Netanel G',
                                            imgUrl: ''
                                        }
                                    }],
                                }, {
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
                                    checklists: [{
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
                                    members: [{
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
                                }, {
                                    _id: utilService.makeId(),
                                    title: 'Buy Some Nutella',
                                    labels: [{
                                            name: 'Important',
                                            bgc: '#F569B7'
                                        },
                                        {
                                            name: 'Food',
                                            bgc: '#82306A'
                                        }
                                    ],
                                    dueDate: [],
                                    members: [],
                                    comments: [],
                                    attachments: [{
                                        _id: utilService.makeId(),
                                        txt: 'Nutella',
                                        url: 'https://images.jumpseller.com/store/hercules-it-llc/10188702/Nutella.jpg?1623999446',
                                        createdAt: Date.now()
                                    }],
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
                                    checklists: [{
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
                            tasks: [{
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
                                    members: [{
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
                                    checklists: [{
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'Im a todo!',
                                            isDone: false
                                        }]
                                    }],
                                    dueDate: [],
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
                                    }, {
                                        _id: utilService.makeId(),
                                        txt: 'Are you Sure?',
                                        createdAt: Date.now(),
                                        byMember: {
                                            _id: utilService.makeId(),
                                            fullname: 'Adir B',
                                            imgUrl: ''
                                        }
                                    }],
                                }, {
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
                                    checklists: [{
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
                                    members: [{
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
                                        txt: 'Maybe well find some Mummies ????',
                                        createdAt: Date.now(),
                                        byMember: {
                                            _id: utilService.makeId(),
                                            fullname: 'Netanel G',
                                            imgUrl: ''
                                        }
                                    }],
                                }, {
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
                                    checklists: [{
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'Im a todo!',
                                            isDone: false
                                        }]
                                    }],
                                    attachments: [],
                                    description: '',
                                    members: [{
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
                        }, {
                            _id: utilService.makeId(),
                            title: 'Important Stuff',
                            dueDate: 1826212211,
                            style: {
                                bgColor: '#f2f3'
                            },
                            tasks: [{
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
                                    checklists: [{
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
                                    members: [{
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
                                }, {
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
                                    checklists: [{
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
                                    dueDate: [],
                                    attachments: [],
                                    description: '',
                                    members: [{
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
                                }, {
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
                                    checklists: [{
                                        _id: utilService.makeId(),
                                        title: 'Checklist',
                                        todos: [{
                                            _id: utilService.makeId(),
                                            title: 'New New New!',
                                            isDone: false
                                        }]
                                    }],
                                    attachments: [],
                                    description: '',
                                    members: [{
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
                                        }
                                    ],
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
    task.labels = (task.labels) ? task.labels : [];
    task.attachments = (task.attachments) ? task.attachments : [];
    task.comments = (task.comments) ? task.comments : [];
    task.description = (task.description) ? task.description : '';
    task.checklists = (task.checklists) ? task.checklists : [];
    task.members = (task.members) ? task.members : [];
    task.dueDate = (task.dueDate) ? task.dueDate : [];
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
    console.log('member in service', member);
    return member

}