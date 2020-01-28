<template>
  <div class="container">
    <h1 class="title">Шаг 2 из 2</h1>
    <div class="block-maps">

      <div class="block-maps__left">
        <h3 class="block-maps_title">Капитан 1: {{captain1}}</h3>
        <span v-show="true" class="block-maps_text">Пик</span>
        <span v-show="!true" class="block-maps_text">Ожидание</span>
      </div>

      <div class="block-maps__middle">
        <ul class="block-maps__list">
          <li class="block-maps__list_item" :class="{'block-maps__list_item_banned': map.banned}" v-for="(map, index) in maps" :key="index" @click="banMap(index)">{{map.name}}</li>
        </ul>
      </div>

      <div class="block-maps__right">
        <h3 class="block-maps_title">Капитан 2: {{captain2}}</h3>
        <span v-show="!true" class="block-maps_text">Пик</span>
        <span v-show="true" class="block-maps_text">Ожидание</span>
      </div>

    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            captain1: 'xyi',
            captain2: 'pizda',
            maps: [
                {
                    name: 'de_dust2',
                    banned: false
                },
                {
                    name: 'de_mirage',
                    banned: false
                },
                {
                    name: 'de_nuke',
                    banned: false
                },
                {
                    name: 'de_train',
                    banned: false
                },
                {
                    name: 'de_inferno',
                    banned: false
                },
                {
                    name: 'de_vertigo',
                    banned: false
                },
                {
                    name: 'de_overpass',
                    banned: false
                },

            ]
        }
    },
    methods: {
      banMap(index) {

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
