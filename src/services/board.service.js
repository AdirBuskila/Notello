
import { storageService } from './async-storage.service.js'
import { pathToStorage } from './storage.service.js'
import { taskService } from './task.service.js'
import { utilService } from './util.service.js'


export const boardService = {
    query,
    getById,
    save,
    remove,
}

const STORAGE_KEY = 'board_DB'
var gBoards;

_createBoards()

async function _createBoards() {
    gBoards = pathToStorage.loadFromStorage(STORAGE_KEY) || []
    if (!gBoards || !gBoards.length) {
        try {
            gBoards = [
                {
                    _id: utilService.makeId(),
                    title: 'b1',
                    createdAt: Date.now(),
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
                    }],
                    groups: [
                        {
                            _id: utilService.makeId(),
                            title: 'g1',
                            createdAt: Date.now(),
                            tasks: await taskService.query({ group: 'g1' })

                        },
                        {
                            _id: utilService.makeId(),
                            title: 'g2',
                            createdAt: Date.now(),
                            tasks: await taskService.query({ group: 'g2' })
                        },
                        {
                            _id: utilService.makeId(),
                            title: 'g3',
                            createdAt: Date.now(),
                            tasks: await taskService.query({ group: 'g3' })
                        }
                    ]
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

function query() {
    return storageService.query(STORAGE_KEY)
}
function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}
function remove(boardId) {
    return storageService.remove(STORAGE_KEY, boardId)
}
function save(board) {
    if (board._id) {
        return storageService.put(STORAGE_KEY, board)
    } else {
        return storageService.post(STORAGE_KEY, board)
    }
}


