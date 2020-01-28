<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
export default {
  beforeMount() {
    this.$socket.on('GET_STATUS', (data) => {
      if (data?.admin?.name !== undefined && data?.captain_one?.name !== undefined && data?.captain_two?.name !== undefined && this.$route.name === '/') {
        this.$router.push('/players')
      }
      console.log('GET_STATUS', data)
    })
  },
  mounted() {
    setTimeout(() => {
      this.$socket.emit('msg', { type: 'GET_STATUS' })
    }, 400)
  }
}
</script>
<style>

</style>
