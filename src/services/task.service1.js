
import {storageService} from './async-storage.service.js'
import { pathToStorage } from './storage.service.js'
import {utilService} from './util.service.js'


export const taskService = {
    query,
    getById,
    save,
    remove,
}

const STORAGE_KEY = 'task_DB'
var gTasks;

// _createTasks()

function _createTasks() {
    gTasks = pathToStorage.loadFromStorage(STORAGE_KEY) || []
    if (!gTasks || !gTasks.length) {
        gTasks = [
            {
                _id: utilService.makeId(),
                title: 'Notello is the GOAT',
                labels: ['Important', 'Relavent'],
                createdAt: Date.now(),
            },
            {
                _id: utilService.makeId(),
                title: 'Gurevich loves scrolling (specially Y axis)',
                labels: ['Work', 'Relavent'],
                createdAt: Date.now(),
            },
            {
                _id: utilService.makeId(),
                title: 'Adir you are a SAVAGE!',
                labels: ['Special', 'Work'],
                createdAt: Date.now(),
            }
        ]
        pathToStorage.saveToStorage(STORAGE_KEY, gTasks);
    }
    return gTasks;
}

function query() {
    return storageService.query(STORAGE_KEY)
}
function getById(taskId) {
    return storageService.get(STORAGE_KEY, taskId)
}
function remove(taskId) {
    // return Promise.reject('Not now!');
    return storageService.remove(STORAGE_KEY, taskId)
}
function save(task) {
    if (task._id) {
        return storageService.put(STORAGE_KEY, task)
    } else {
        return storageService.post(STORAGE_KEY, task)
    }
}

function getEmptyTask() {
    return { 
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),  
    };
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))


