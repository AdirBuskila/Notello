import { utilService } from "./util.service"


export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return Promise.resolve(entities)
}


async function get(entityType, entityId) {
    let entities = await query(entityType);
    const entity = entities.find(entity => entity._id === entityId);
    return entity
}

async function post(entityType, newEntity) {
    newEntity._id = utilService.makeId()
    newEntity.createdAt = Date.now()
    let entities = await query(entityType);
    entities = [...entities, newEntity];
    _save(entityType, entities)
    return newEntity
}

async function put(entityType, updatedEntity) {
    let entities = await query(entityType);
    const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
}

async function remove(entityType, entityId) {
    let entities = await query(entityType);
    const idx = entities.findIndex(entity => entity._id === entityId)
    entities.splice(idx, 1)
    _save(entityType, entities)
}


function _save(entityType, entities) {
    console.log('entityType FROM SAVE!', entityType)
    localStorage.setItem(entityType, JSON.stringify(entities))
}