<template>
  <div class="container">
    <h1 class="title">xPloit Pracc Helper</h1>
    <div>
      <el-input v-model="name" />
    </div>
    <div class="block">
      <el-button type="primary" @click="joinAsAdmin" :disabled="isNoName || isAdmin">Я - Админ</el-button>
      <el-button type="primary" @click="joinAsCaptain" :disabled="isNoName || isCaptains">Я - Капитан команды</el-button>
      <el-button type="primary" @click="joinAsPlayer">Я - Игрок</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Ravy',
      room: null
    }
  },
  computed: {
    isNoName() {
      return this.name.length < 3
    },
    isAdmin() {
      return this?.room?.admin?.name !== undefined
    },
    isCaptains() {
      return this?.room?.captain_one?.name !== undefined && this?.room?.captain_two?.name !== undefined
    }
  },
  methods: {
    joinAsAdmin() {
      this.$socket.emit('msg', { type: 'ADMIN_ENTER', name: this.name })
      this.$socket.emit('msg', { type: 'GET_STATUS' })
    },
    joinAsCaptain() {
      this.$socket.emit('msg', { type: 'CAPTAIN_ENTER', name: this.name })
      this.$socket.emit('msg', { type: 'GET_STATUS' })
    },
    joinAsPlayer() {
      this.$socket.emit('msg', { type: 'PLAYER_ENTER' })
    }
  },
  beforeMount () {
    this.$socket.on('INCOMING_TASK', (data) => {
      console.log('INCOMING_TASK', data)
      this.task = data
    })
    this.$socket.on('GET_STATUS', (data) => {
      console.log('GET_STATUS', data)
      this.room = data
    })
    this.$socket.on('COMPLETED_TASKS', (data) => {
      console.log('COMPLETED_TASKS', data)
      if (data.length === 0) {
        this.task = {
          text: process.env.INTRO_TEXT
        }
      }
    })
    this.$socket.on('GET_LAST_TASK', (data) => {
      console.log('GET_LAST_TASK', data)
      this.task = data
    })
  },
  mounted () {
    setTimeout(() => {
      this.$socket.emit('task', { type: 'GET_LAST_TASK' })
      //this.$socket.emit('task', { type: 'GET_LAST_TASK' })
    }, 1000)
  }
}
</script>

<style lang="sass" scoped>
.container
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
.title
  font-size: 60px
  line-height: 80px
  margin-bottom: 100px
</style>
