<template>
  <div class="container">
    <h1 class="title">xPloit Pracc Helper</h1>
    <div class="block">
      <button class="block-button" @click="joinAsAdmin">Я - Админ</button>
      <button class="block-button" @click="joinAsCaptainFirst">Я - Капитан <span class="block-button_colored">первой</span> команды</button>
      <button class="block-button" @click="joinAsCaptainSecond">Я - Капитан <span class="block-button_colored">второй</span> команды</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {

  },
  methods: {
    joinAsAdmin() {
      console.log('click-admin')
    },
    joinAsCaptainFirst() {
      console.log('click-cap1')
    },
    joinAsCaptainSecond() {
      console.log('click-cap2')
    }
  },
  beforeMount () {
    this.$socket.on('INCOMING_TASK', (data) => {
      console.log('INCOMING_TASK', data)
      this.task = data
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
.block
  display: flex
  flex-direction: column

  &-button
    font-size: 30px
    line-height: 40px
    margin-bottom: 25px
    width: 500px
    border: 2px solid black
    border-radius: 10px
    padding: 10px 0
    background-color: white
    &:hover
      background-color: #f7f8fb
</style>
