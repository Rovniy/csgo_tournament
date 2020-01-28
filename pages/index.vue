<template>
  <div class="container">
    <img v-if="isHasImage" :src="isHasImage" :class="isHasImageClass" alt="isHasImage">
    <h1 v-if="isHasText" :class="isHasTextClass">
      {{ isHasText }}
    </h1>
    <a v-if="isHasLink" :href="isHasLink" target="_blank">
      {{ isHasLink }}
    </a>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        task: {
          text: process.env.INTRO_TEXT
        },
        pong: 1
      }
    },
    computed: {
      isHasText () {
        if (this.task.hasOwnProperty('text') && this.task.text !== null) {
          return this.task.text
        }
        return false
      },
      isHasLink () {
        if (this.task.hasOwnProperty('link') && this.task.link !== null) {
          return (location.protocol + '//' + location.host + '/' + this.task.link)
        }
        return false
      },
      isHasImage () {
        if (this.task.hasOwnProperty('image') && this.task.image !== null) {
          return this.task.image
        }
        return false
      },
      isHasImageClass () {
        if (this.task.hasOwnProperty('imageClass') && this.task.imageClass !== null) {
          return this.task.imageClass
        }
        return false
      },
      isHasTextClass () {
        if (this.task.hasOwnProperty('textClass') && this.task.textClass !== null) {
          return this.task.textClass
        }
        return false
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
      }, 1000)
    }
  }
</script>

<style lang="sass" scoped>
  .container
    width: 100vw
    height: calc(100vh - 60px)
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column

    img
      max-height: 500px

    h1
      margin: 20px 0
      max-width: 70%
      text-align: center

  .ask
    height: 14px

  .Base64Spinner
    @keyframes spinner
      0%
        transform: rotateZ(0) rotateY(0) rotateX(0)
      100%
        transform: rotateZ(360deg) rotateY(360deg) rotateX(360deg)
    animation: spinner 2s infinite linear
</style>
