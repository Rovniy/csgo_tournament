<template>
  <div class="container">
    <textarea name="" id="" cols="30" rows="10">{{text}}</textarea>
  </div>
</template>

<script>
export default {
    data() {
        return {
            room: null
        }
    },
    beforeMount() {
        this.$socket.on('GET_STATUS', data => {
            this.room = data
            console.log('GET_STATUS', data)
        })
    },
    mounted() {
        setTimeout(() => {
            this.$socket.emit('msg', {type: 'GET_STATUS'})
        }, 500)
    },
}
</script>
