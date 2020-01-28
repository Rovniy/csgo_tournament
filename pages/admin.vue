<template>
  <div class="container">
    <form @submit="addPlayer" action="#" novalidate>
      <label for="player" class="label">Имя игрока:</label>
      <input class="input" type="text" id="player" placeholder="Введите имя" v-model="playerName">
      <button type="submit" class="el-button">Добавить</button>
    </form>
    <div>
      <h1 class="title">Список игроков</h1>
      <ul class="block-pickers__players__list">
        <li class="block-pickers__players__list_item" v-for="(player, index) in players" :key="index" @click="removePlayer(index)">{{player}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            playerName: null,
            players: [
                'first',
                'second',
                'third',
                'fourth',
                'fifth',
                'sixth'
            ]
        }
    },
    methods: {
        addPlayer() {
            this.playerName = null
        },
        removePlayer() {

        }
    }
}
</script>

<style lang="sass" scoped>
.container
  margin-top: 20vh
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

.title
  font-size: 60px
  line-height: 80px
  margin-bottom: 50px
  text-align: center

.label
  font-size: 24px
  line-height: 36px

.input
  padding: 5px
  border-radius: 5px
  border: 2px solid gray

.block-pickers__players__list
  margin: 0 -5px
  width: 510px
  padding: 0
  list-style-type: none
  font-size: 20px
  line-height: 28px
  font-weight: bold
  display: flex
  flex-direction: row
  flex-wrap: wrap
  &_item
    margin: 5px
    width: 150px
    text-align: center
    padding: 5px
    border-radius: 5px
    color: white
    background-color: black
    cursor: pointer
    position: relative

    &::before, &::after
      content: ''
      position: absolute
      top: calc(50% - 1px)
      right: 5px
      transform: rotate(45deg)
      width: 15px
      height: 2px
      background-color: white
    &::after
      transform: rotate(-45deg)
</style>
