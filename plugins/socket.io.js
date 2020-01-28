import io from 'socket.io-client'
import Vue from 'vue'

const socket = io(process.env.WS_URL)

Vue.use({
  install (Vue) {
    Vue.prototype.$socket = socket
  }
})
