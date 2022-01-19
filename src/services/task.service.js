import { storageService } from './async-storage.service.js'
import { pathToStorage } from './storage.service.js'
import { utilService } from './util.service.js'


export const taskService = {
    query,
    getById,
    save,
    remove,
}

const STORAGE_KEY = 'task_DB'
var gTasks;

_createTasks()

function _createTasks() {
    gTasks = pathToStorage.loadFromStorage(STORAGE_KEY) || []
    if (!gTasks || !gTasks.length) {
        gTasks = [{
                _id: utilService.makeId(),
                title: 'Notello is the GOAT',
                labels: [{
                        name: 'Important',
                        bgc: '#FF5677'
                    },
                    {
                        name: 'Relavent',
                        bgc: '#F0BB62'
                    }
                ],
                createdAt: Date.now(),
                group: 'n1'
            },
            {
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
                createdAt: Date.now(),
                group: 'n1'
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
                createdAt: Date.now(),
                group: 'n2'
            }
        ]
        pathToStorage.saveToStorage(STORAGE_KEY, gTasks);
    }
    return gTasks;
}

async function query(filter = { group: '' }) {
    if (!filter.group) return storageService.query(STORAGE_KEY)

    let tasks = await storageService.query(STORAGE_KEY);
    tasks = tasks.filter(task => {
        return task.group === filter.group
    })
    return tasks;

}

function getById(taskId) {
    return storageService.get(STORAGE_KEY, taskId)
}

function remove(taskId) {
    return storageService.remove(STORAGE_KEY, taskId)
}

function save(task) {
    if (task._id) {
        return storageService.put(STORAGE_KEY, task)
    } else {
        return storageService.post(STORAGE_KEY, task)
    }
}