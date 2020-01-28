<template>
  <div class="container">
    <h1 class="title">Шаг 1 из 2</h1>
    <div class="block-pickers">

      <div class="block-pickers__left">
        <h3 class="block-pickers_title">Капитан 1: {{ captainOne }}</h3>
        <el-row>
          <ul class="block-pickers__side__list">
            <li class="block-pickers__side__list_item" v-for="player in teamOne" :key="player"
                @click="removePlayer(player)">
              <el-button type="warning" plain>
                {{ player }}
              </el-button>
            </li>
          </ul>
        </el-row>
        <el-row>
          <span v-show="parseInt(role) === room.whose_turn" class="block-pickers__side_text">Пик</span>
          <span v-show="parseInt(role) !== room.whose_turn" class="block-pickers__side_text">Ожидание</span>
        </el-row>
      </div>

      <div class="block-pickers__players">
        <ul class="block-pickers__players__list">
          <li class="block-pickers__players__list_item"
              v-for="(player, index) in playersList"
              :key="index"
              @click="pickPlayer(player)">
            <el-button type="primary"
                       :disabled="room.whose_turn !== parseInt(role)">
              {{ player }}
            </el-button>
          </li>
        </ul>
      </div>

      <div class="block-pickers__right">
        <h3 class="block-pickers_title">Капитан 2: {{ captainTwo }}</h3>
        <ul class="block-pickers__side__list">
          <li class="block-pickers__side__list_item" v-for="player in teamOTwo" :key="player"
              @click="removePlayer(player)">
            <el-button type="warning" plain>
              {{ player }}
            </el-button>
          </li>
        </ul>
        <span v-show="parseInt(role) !== room.whose_turn" class="block-pickers__side_text">Пик</span>
        <span v-show="parseInt(role) === room.whose_turn" class="block-pickers__side_text">Ожидание</span>
      </div>
    </div>

    <button v-if="role === 'ADMIN'" class="el-button" @click="nextStep">Далее</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      room: {},
      role: null
    }
  },
  computed: {
    captainOne() {
      return this.room?.captain_one?.name
    },
    captainTwo() {
      return this.room?.captain_two?.name
    },
    playersList() {
      return this.room?.players
    },
    teamOne() {
      if (this.room?.teams) {
        if (this.captainOne) {
          if (this.room.teams[this.captainOne]) {
            return this.room.teams[this.captainOne]
          }
        }
      }
      return []
    },
    teamOTwo() {
      if (this.room?.teams) {
        if (this.captainTwo) {
          if (this.room.teams[this.captainTwo]) {
            return this.room.teams[this.captainTwo]
          }
        }
      }
      return []
    }
  },
  beforeMount() {
    this.$socket.on('GET_STATUS', data => {
      this.room = data
      console.log('GET_STATUS', data)
    })
    this.$socket.on('CHOOSE_PLAYER', data => {
      this.players = data
      console.log('CHOOSE_PLAYER', data)
    })
  },
  mounted() {
    setTimeout(() => {
      this.$socket.emit('msg', {type: 'GET_STATUS'})
    }, 500)

    this.role = localStorage.getItem('ROLE')
  },
  methods: {
    pickPlayer(player) {
      this.$socket.emit('msg', { type: 'CHOOSE_PLAYER', name: player })
    },
    removePlayer(player) {
      this.$socket.emit('msg', { type: 'CANCEL_CHOOSE_PLAYER', player })
    },
    nextStep() {
      this.$router.push('maps')
    }
  }
}
</script>

<style lang="sass" scoped>
  .container
    padding-top: 70px
    display: flex
    flex-direction: column
    align-items: center

  .title
    font-size: 40px
    line-height: 55px
    margin-bottom: 100px

  .block-pickers
    width: 100%
    display: flex
    flex-direction: row
    justify-content: space-around

    &__left, &__right
      position: relative

    &_title
      border: 2px solid black
      border-radius: 5px
      padding: 5px
      width: 250px
      text-align: center

    &__players, &__side

      &__list
        padding: 52px 0 0 0
        list-style-type: none
        font-size: 20px
        line-height: 28px
        font-weight: bold


        &_item
          margin-bottom: 5px
          width: 150px
          text-align: center
          padding: 5px
          border-radius: 5px
          color: white
          cursor: pointer

    &__side
      &__list
        padding-top: 0
        width: fit-content
        margin: 0 auto

      &_text
        display: block
        text-align: center
        font-size: 30px
        line-height: 40px
        border-radius: 10px
</style>
