require('dotenv').config()

const app = require('express')()
const http = require('http').createServer(app) // eslint-disable-line import/order
const io = require('socket.io')(http)
const MAP_POOL = ['de_dust2', 'de_mirage', 'de_nuke', 'de_inferno', 'de_train', 'de_vertigo', 'de_overpass']
const room = {
  admin: {
    name: undefined,
    token: null
  },
  captain_one: {
    name: undefined,
    token: null
  },
  captain_two: {
    name: undefined,
    token: null
  },
  players: [],
  maps: []
}

MAP_POOL.forEach(map => {
  room.maps.push({
    name: map,
    banned: false
  })
})

io.on('connection', function (socket) {
    console.log('USER CONNECTED. ID:', socket.id)

    socket.on('disconnect', function () {
        console.log('USER DISCONNECTED', socket.id)
    })

    socket.on('msg', function (data) {
      console.log('msg', data)
      switch (data.type) {
            case 'ADMIN_ENTER':
                if (room.admin.name === undefined) {
                  room.admin.name = data.name
                  room.admin.token = Date.now()
                  socket.emit('ADMIN_ENTER_CONFIRM', room.admin)
                  console.log('ADMIN_ENTER_FIRST_TIME')
                } else if (room.admin.name === data.name) {
                  socket.emit('ADMIN_ENTER_CONFIRM', room.admin)
                  console.log('ADMIN_ENTER_AGAIN')
                }
              break

            case 'CAPTAIN_ENTER':
              if (room.captain_one.name === undefined) {
                room.captain_one.name = data.name
                room.captain_one.token = Date.now()
                socket.emit('CAPTAIN_ENTER_1_CONFIRM', room.captain_one)

                console.log('CAPTAIN_ENTER_1_FIRST_TIME', room.captain_one)
              } else if (room.captain_two.name === undefined && room.captain_one.name !== data.name) {
                room.captain_two.name = data.name
                room.captain_two.token = Date.now()
                socket.emit('CAPTAIN_ENTER_2_CONFIRM', room.captain_two)

                console.log('CAPTAIN_ENTER_2_FIRST_TIME', room.captain_two)
              } else if (room.captain_one.name === data.name) {
                socket.emit('CAPTAIN_ENTER_1_CONFIRM', room.captain_one)
                console.log('CAPTAIN_ENTER_1_AGAIN', room.captain_two)
              } else if (room.captain_two.name === data.name) {
                socket.emit('CAPTAIN_ENTER_2_CONFIRM', room.captain_two)
                console.log('CAPTAIN_ENTER_2_AGAIN', room.captain_two)
              }
                break

            case 'GET_MAPS':
                socket.emit('GET_MAPS', room.maps)
                break

            case 'BAN_MAP':
                room.maps.forEach(map => {
                  if (map.name === data.map) {
                    map.banned = true
                  }
                })
                socket.emit('BAN_MAP', room.maps)
                break

            case 'CREATE_PLAYER':
                room.players.push(data.map)
                socket.emit('CREATE_PLAYER', room.players)
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
