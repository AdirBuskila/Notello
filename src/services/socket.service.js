import io from 'socket.io-client'

export const SOCKET_EMIT_BOARD_UPDATED = 'board-update';
export const SOCKET_EVENT_BOARD_UPDATED = 'board-updated';
export const SOCKET_EVENT_SET_VIEW_BOARD = 'view board';


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3333'
export const socketService = createSocketService()

// for debugging from console
// window.socketService = socketService

socketService.setup()


function createSocketService() {
    var socket = null;
    const socketService = {
        setup() {
            socket = io(baseUrl)
        },
        on(eventName, cb) {
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return;
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            socket.emit(eventName, data)
        },
        terminate() {
            socket = null
        }
    }
    return socketService
}