require('dotenv').config()

const app = require('express')()
// eslint-disable-next-line import/order
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')
const db = new JsonDB(new Config('tasksDataBase', true, false, '/'))
const tasksList = db.getData('/tasks')

let completedTasks = db.getData('@/completedTasks')

io.on('connection', function (socket) {
    console.log('USER CONNECTED. ID:', socket.id)

    socket.on('disconnect', function () {
        console.log('USER DISCONNECTED', socket.id)
    })

    socket.on('task', function (data) {
        switch (data.type) {
            case 'SET_TASK':
                console.log('SET_TASK', data.id)
                completedTasks.push({
                    text: tasksList[data.id].text,
                    link: tasksList[data.id].hasOwnProperty('link') ? tasksList[data.id].link : null,
                    image: tasksList[data.id].hasOwnProperty('image') ? tasksList[data.id].image : null,
                    imageClass: tasksList[data.id].hasOwnProperty('imageClass') ? tasksList[data.id].imageClass : null,
                    textClass: tasksList[data.id].hasOwnProperty('textClass') ? tasksList[data.id].textClass : null,
                    id: data.id,
                    time: Date.now()
                })
                db.push('/completedTasks', completedTasks)
                io.emit('INCOMING_TASK', tasksList[data.id])
                break

            case 'CLEAR_TASKS':
                if (data.password === process.env.ADMIN_PASSWORD) {
                    console.log('CLEAR_TASKS')
                    completedTasks = []
                    db.push('/completedTasks', [])
                    io.emit('COMPLETED_TASKS', [])
                }
                break

            case 'GET_COMPLETED':
                console.log('GET_COMPLETED')
                socket.emit('COMPLETED_TASKS', completedTasks)
                break

            case 'GET_LAST_TASK':
                console.log('GET_LAST_TASK')
                socket.emit('GET_LAST_TASK', getLastTask())
                break

            case 'FORCE_PING':
                console.log('FORCE_PING')
                socket.emit('FORCE_PING')
                break

            case 'LOGIN':
                console.log('LOGIN')
                if (data.name === process.env.ADMIN_NAME) {
                    socket.join(process.env.ADMIN_ROOM)
                    console.log('POST TASKS_LIST')
                    io.to(process.env.ADMIN_ROOM).emit('TASKS_LIST', tasksList)
                }
                break

            default:
                break
        }
    })
})

http.listen(3001, function () {
    console.log('listening on *:3001')
})

const getLastTask = () => {
    let lastTask = {
        text: process.env.INTRO_TEXT,
        link: null,
        image: null,
        id: 0,
        time: 0
    }

    completedTasks.forEach((item) => {
        if (item.time > lastTask.time) {
            lastTask = item
        }
    })

    return lastTask
}
