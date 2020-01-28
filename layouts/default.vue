<template>
  <el-container>
    <el-header>
      <header-component v-if="isAdmin"/>
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
  </el-container>
</template>

<script>
import HeaderComponent from '@/components/header'

export default {
  data() {
    return {
      isAdmin: false
    }
  },
  components: {
    HeaderComponent
  },
  beforeMount() {
    this.$socket.on('GET_STATUS', () => {
      const myRole = localStorage.getItem('ROLE')
      this.isAdmin = myRole === 'ADMIN'
    })
    this.$socket.on('RESET_DEFAULT', () => {
      localStorage.removeItem('ROLE')
      this.$route.push('/')
    })

  },
  mounted() {
    const myRole = localStorage.getItem('ROLE')
    this.isAdmin = myRole === 'ADMIN'
  }
}
</script>
<style>

</style>
