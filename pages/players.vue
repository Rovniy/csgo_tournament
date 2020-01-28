<template>
  <div class="container">
    <h1 class="title">Шаг 1 из 2</h1>
    <div class="block-pickers">

      <div class="block-pickers__left">
        <h3 class="block-pickers_title">Капитан 1: {{ captainOne }}</h3>
        <ul class="block-pickers__side__list">
          <li class="block-pickers__side__list_item" v-for="(player, index) in teamOne" :key="index"
              @click="removePlayerTeam1(index)">{{player}}
          </li>
        </ul>
        <span v-show="true" class="block-pickers__side_text">Пик</span>
        <span v-show="!true" class="block-pickers__side_text">Ожидание</span>
      </div>

      <div class="block-pickers__players">
        <ul class="block-pickers__players__list">
          <li class="block-pickers__players__list_item" v-for="(player, index) in playersList" :key="index"
              @click="pickPlayer(player)">{{ player }}
          </li>
        </ul>
      </div>

      <div class="block-pickers__right">
        <h3 class="block-pickers_title">Капитан 2: {{ captainTwo }}</h3>
        <ul class="block-pickers__side__list">
          <li class="block-pickers__side__list_item" v-for="(player, index) in teamOTwo" :key="index"
              @click="removePlayerTeam2(index)">{{player}}
          </li>
        </ul>
        <span v-show="!true" class="block-pickers__side_text">Пик</span>
        <span v-show="true" class="block-pickers__side_text">Ожидание</span>
      </div>
    </div>

    <button v-if='role' class="el-button" @click="nextStep">Далее</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        room: null,
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
        return this.room?.teams[this.room?.captain_one?.name]
      },
      teamOTwo() {
        return this.room?.teams[this.room?.captain_two?.name]
      },
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
      this.role = localStorage.getItem('role')
    },
    methods: {
      pickPlayer(player) {
        this.$socket.emit('msg', { type: 'CHOOSE_PLAYER', name: player })
      },
      removePlayerTeam1(index) {

      },
      removePlayerTeam2(index) {

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
          background-color: black
          cursor: pointer

    &__side
      &__list
        padding-top: 0
        width: fit-content
        margin: 0 auto

      &_text
        position: absolute
        bottom: 0
        left: 0
        right: 0
        margin: auto
        font-size: 30px
        text-align: center
        line-height: 40px
        border-radius: 10px
</style>
