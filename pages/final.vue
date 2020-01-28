<template>
  <div class="container">
    <textarea name="" id="" cols="50" rows="30">{{text}}</textarea>
  </div>
</template>

<script>
  export default {
    data() {
        return {
            room: null
        }
    },
    computed: {
        text() {
            const map = this?.room?.maps.find(el => el.banned === false)
            return 'Team White\n' +
                this?.room?.captain_one?.name + ' - Капитан команды\n' +
                this?.room?.teams[this?.room?.captain_one?.name][0] + '\n' +
                this?.room?.teams[this?.room?.captain_one?.name][1] + '\n' +
                this?.room?.teams[this?.room?.captain_one?.name][2] + '\n' +
                this?.room?.teams[this?.room?.captain_one?.name][3] + '\n\n' +
                'Team Red\n' +
                this?.room?.captain_two?.name + ' - Капитан команды\n' +
                this?.room?.teams[this?.room?.captain_two?.name][0] + '\n' +
                this?.room?.teams[this?.room?.captain_two?.name][1] + '\n' +
                this?.room?.teams[this?.room?.captain_two?.name][2] + '\n' +
                this?.room?.teams[this?.room?.captain_two?.name][3] + '\n\n' +
                'Выбранная карта: ' + map?.name

        }
    },
    beforeMount() {
      this.$socket.on('GET_STATUS', data => {
        this.room = data
        console.log('GET_STATUS', data)
      })
    },
    beforeDestroy() {
      this.$socket.off('GET_STATUS')
    },
    mounted() {
      setTimeout(() => {
        this.$socket.emit('msg', {type: 'GET_STATUS'})
      }, 500)
    },
  }
</script>
