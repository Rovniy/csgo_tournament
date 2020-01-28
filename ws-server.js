require('dotenv').config()

const app = require('express')()
const http = require('http').createServer(app) // eslint-disable-line import/order
const io = require('socket.io')(http)
const MAP_POOL = ['de_dust2', 'de_mirage', 'de_nuke', 'de_inferno', 'de_train', 'de_vertigo', 'de_overpass']
const room = {
  admin: undefined
}

io.on('connection', function (socket) {
    console.log('USER CONNECTED. ID:', socket.id)

    socket.on('disconnect', function () {
        console.log('USER DISCONNECTED', socket.id)
    })

    socket.on('msg', function (data) {
        switch (data.type) {
            case 'ADMIN_ENTER':
                if (room.admin === undefined) {
                  room.admin = data
                }
                break

            case 'CAPTAIN_ENTER':
                // if (data.password === process.env.ADMIN_PASSWORD) {
                //     console.log('CLEAR_TASKS')
                //     completedTasks = []
                //     db.push('/completedTasks', [])
                //     io.emit('COMPLETED_TASKS', [])
                // }
                break

            case 'GET_COMPLETED':
                // console.log('GET_COMPLETED')
                // socket.emit('COMPLETED_TASKS', completedTasks)
                break

            case 'GET_LAST_TASK':
                // console.log('GET_LAST_TASK')
                // socket.emit('GET_LAST_TASK', getLastTask())
                break

            case 'FORCE_PING':
                // console.log('FORCE_PING')
                // socket.emit('FORCE_PING')
                break

            case 'LOGIN':
                // console.log('LOGIN')
                // if (data.name === process.env.ADMIN_NAME) {
                //     socket.join(process.env.ADMIN_ROOM)
                //     console.log('POST TASKS_LIST')
                //     io.to(process.env.ADMIN_ROOM).emit('TASKS_LIST', tasksList)
                // }
                break

            default:
                break
        }
    })
})

http.listen(3001, function () {
    console.log('listening on *:3001')
})
