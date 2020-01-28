<template>
  <div class="container">
    <h1 class="title">Шаг 2 из 2</h1>
    <div class="block-maps">

      <div class="block-maps__left">
        <h3 class="block-maps_title">Капитан 1: {{captainOne}}</h3>
        <span v-show="parseInt(role) === room.whose_turn" class="block-maps_text">Пик</span>
        <span v-show="parseInt(role) !== room.whose_turn" class="block-maps_text">Ожидание</span>
      </div>

      <div class="block-maps__middle">
        <div class="block-maps__list">
          <button class="block-maps__list_item" :class="{'block-maps__list_item_banned': map.banned}"
                  v-for="(map, index) in mapsList" :key="index" @click="banMap(map.name)" :disabled="map.banned">
            {{map.name}}
          </button>
        </div>
      </div>

      <div class="block-maps__right">
        <h3 class="block-maps_title">Капитан 2: {{captainTwo}}</h3>
        <span v-show="parseInt(role) !== room.whose_turn" class="block-maps_text">Пик</span>
        <span v-show="parseInt(role) === room.whose_turn" class="block-maps_text">Ожидание</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      room: {},
      maps: [],
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
    mapsList() {
      return this.room?.maps
    }
  },
  methods: {
    banMap(mapName) {
      this.$socket.emit('msg', {type: 'BAN_MAP', map: mapName})
      this.$socket.emit('msg', {type: 'GET_STATUS'})
    }
  },
  beforeMount() {
    this.$socket.on('GET_STATUS', data => {
      this.room = data
      console.log('GET_STATUS', data)
    })
    this.$socket.on('MAP_IS_CHOOSE_GO_NEXT', () => {
      this.$router.push('/final')
      console.log('MAP_IS_CHOOSE_GO_NEXT',)
    })
  },
  beforeDestroy() {
    this.$socket.off('GET_STATUS')
    this.$socket.off('MAP_IS_CHOOSE_GO_NEXT')
  },
  mounted() {
    setTimeout(() => {
      this.$socket.emit('msg', {type: 'GET_STATUS'})
    }, 500)

    this.role = localStorage.getItem('ROLE')
  },
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

  .block-maps
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

    &__list
      padding: 52px 0 0 0
      font-size: 20px
      line-height: 28px
      font-weight: bold
      display: flex
      flex-direction: column
      align-items: center

      &_item
        font-size: 20px
        line-height: 28px
        font-weight: bold
        margin-bottom: 5px
        width: 150px
        text-align: center
        padding: 5px
        border-radius: 5px
        border: none
        color: white
        background-color: orangered
        cursor: pointer

        &_banned
          background-color: orange
          color: #7F828B
          cursor: not-allowed
          position: relative

          &::before
            content: ''
            position: absolute
            top: calc(50% - 2px)
            left: 0
            width: 100%
            height: 2px
            background-color: black
            transform: rotate(10deg)

    &_text
      display: block
      margin: auto
      font-size: 30px
      text-align: center
      line-height: 40px
      border-radius: 10px


</style>
