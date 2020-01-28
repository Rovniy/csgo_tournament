<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <el-menu-item index="1">Админка</el-menu-item>
    <el-menu-item index="2">Главная</el-menu-item>
    <el-menu-item index="3">Выбор карт</el-menu-item>
    <el-menu-item index="4">Выбор игроков</el-menu-item>
    <el-menu-item index="5">Финалочка</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key) {
        switch(key) {
          case '1':
            this.$router.push('/admin')
            break
          case '2':
            this.$router.push('/')
            break
          case '3':
            this.$router.push('/maps')
            break
          case '4':
            this.$router.push('/players')
            break
          case '5':
            this.$router.push('/final')
            break
        }
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
