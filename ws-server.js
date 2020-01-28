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
  players: ['valera', 'andrey', 'vanya'],
  maps: [],
  maps_ready_count: 0,
  teams: {},
  whose_turn: 1
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
    switch ( data.type ) {
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
          room.teams[room.captain_one.name] = []
          socket.emit('CAPTAIN_ENTER_1_CONFIRM', room.captain_one)

          console.log('CAPTAIN_ENTER_1_FIRST_TIME', room.captain_one)
        } else if (room.captain_two.name === undefined && room.captain_one.name !== data.name) {
          room.captain_two.name = data.name
          room.captain_two.token = Date.now()
          room.teams[room.captain_two.name] = []
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

      case 'PLAYER_ENTER':
        socket.emit('PLAYER_ENTER')
        break

      case 'GET_MAPS':
        socket.emit('GET_MAPS', room.maps)
        break

      case 'GO_CHOOSE_MAP':
        socket.emit('GO_CHOOSE_MAP')
        break

      case 'BAN_MAP':
        room.maps.forEach(map => {
          if (map.name === data.map) {
            map.banned = true
          }
        })

        room.maps_ready_count++

        if (room.maps_ready_count === room.maps.length - 1) {
          socket.emit('MAP_IS_CHOOSE_GO_NEXT', room.maps)
        } else {
          socket.emit('BAN_MAP', room.maps)
        }
        break

      case 'CREATE_PLAYER':
        room.players.push(data.map)
        socket.emit('CREATE_PLAYER', room.players)
        break

      case 'GET_TEAMS':
        socket.emit('GET_TEAMS', room.teams)
        break

      case 'GET_PLAYERS':
        socket.emit('GET_PLAYERS', room.players)
        break

      case 'DELETE_PLAYERS':
        const playerIndex = room.players.indexOf(data.name)

        if (playerIndex !== -1) {
          room.players.splice(playerIndex, 1)
        }
        socket.emit('DELETE_PLAYERS', room.players)
        break

      case 'CHOOSE_PLAYER':
        if (room.whose_turn === 1) {
          room.teams[room.captain_one.name].push(data.player)
          room.whose_turn = 2
          socket.emit('WHOSE_TURN', room.captain_two.token)
        } else if (room.whose_turn === 2) {
          room.teams[room.captain_two.name].push(data.player)
          room.whose_turn = 1
          socket.emit('WHOSE_TURN', room.captain_one.token)
        }
        socket.emit('CHOOSE_PLAYER', room.teams)
        break

      case 'CANCEL_CHOOSE_PLAYER':
        let index = room.teams[room.captain_one.token].indexOf(data.player)
        if (index !== -1) {
          room.teams[room.captain_one.name].splice(index, 1)
        }

        index = room.teams[room.captain_two.token].indexOf(data.player)
        if (index !== -1) {
          room.teams[room.captain_two.name].splice(index, 1)
        }

        if (room.whose_turn === 1) {
          room.whose_turn = 2
          socket.emit('WHOSE_TURN', room.captain_two.token)
        } else {
          room.whose_turn = 1
          socket.emit('WHOSE_TURN', room.captain_one.token)
        }

        socket.emit('CHOOSE_PLAYER', room.teams)
        break

      default:
        break
    }
  })
})

http.listen(3001, function () {
  console.log('listening on *:3001')
})
