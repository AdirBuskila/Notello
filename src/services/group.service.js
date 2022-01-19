
import {storageService} from './async-storage.service.js'
import { pathToStorage } from './storage.service.js'
import {utilService} from './util.service.js'
import { taskService } from './task.service.js'


export const groupService = {
    query,
    getById,
    save,
    remove,
}

const STORAGE_KEY = 'group_DB'
var gGroups;

_createGroups()

async function _createGroups() {
    gGroups = pathToStorage.loadFromStorage(STORAGE_KEY) || []
    if (!gGroups || !gGroups.length) {
        try {
            gGroups = [
                {
                    _id: utilService.makeId(),
                    title: 'n1',
                    createdAt: Date.now(),
                    tasks: await taskService.query({group: 'n1'})
                },
                {
                    _id: utilService.makeId(),
                    title: 'n2',
                    createdAt: Date.now(),
                    tasks: await taskService.query({group: 'n2'})
                },
                {
                    _id: utilService.makeId(),
                    title: 'n3',
                    createdAt: Date.now(),
                    tasks: await taskService.query({group: 'n3'})
                }
            ]
            pathToStorage.saveToStorage(STORAGE_KEY, gGroups);
            return gGroups;
        } catch (err) {
            console.log('Cant load groups');
            throw new Error(err);
        }
    }
}

async function query() {
    try {
        const groups = await storageService.query(STORAGE_KEY)
        console.log("groups: ", groups);
        return groups
    } catch (err) {
        console.log('Cant load tasks');
        throw new Error(err);
    }
}
function getById(groupId) {
    return storageService.get(STORAGE_KEY, groupId)
}
function remove(groupId) {
    return storageService.remove(STORAGE_KEY, groupId)
}
function save(group) {
    if (group._id) {
        return storageService.put(STORAGE_KEY, group)
    } else {
        return storageService.post(STORAGE_KEY, group)
    }
}


