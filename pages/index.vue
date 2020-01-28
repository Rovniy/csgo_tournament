<template>
  <div class="container">
    <h1 class="title">xPloit Pracc Helper</h1>
    <div>
      <el-input v-model="name" />
    </div>
    <div class="block">
      <el-button type="primary" @click="joinAsAdmin" :disabled="isNoName || isAdmin">Я - Админ</el-button>
      <el-button type="primary" @click="joinAsCaptain" :disabled="isNoName || isCaptains || disableButton">Я - Капитан команды</el-button>
      <el-button type="primary" @click="joinAsPlayer">Я - Игрок</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Ravy',
      room: null,
      disableButton: false
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
      this.disableButton = true
    },
    joinAsPlayer() {
      this.$socket.emit('msg', { type: 'PLAYER_ENTER' })
    }
  },
  beforeMount () {
    this.$socket.on('GET_STATUS', (data) => {
      this.room = data

      if (data?.admin?.name !== undefined && data?.captain_one?.name !== undefined && data?.captain_two?.name !== undefined) {
        this.$router.push('/players')
      }
    })
    this.$socket.on('ADMIN_ENTER_CONFIRM', () => {
      localStorage.setItem('ROLE', 'ADMIN')
    })
    this.$socket.on('CAPTAIN_ENTER_1_CONFIRM', () => {
      localStorage.setItem('ROLE', '1')
    })
    this.$socket.on('CAPTAIN_ENTER_2_CONFIRM', () => {
      localStorage.setItem('ROLE', '2')
    })
  },
  mounted () {
    setTimeout(() => {
      this.$socket.emit('msg', { type: 'GET_STATUS' })
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
