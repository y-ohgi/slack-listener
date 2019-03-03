<template>
  <v-layout>
    <h1>hoge</h1>
  </v-layout>
</template>

<script>
import io from 'socket.io-client'

export default {
  data() {
    return {
      socket: ''
    }
  },

  mounted() {
    this.socket = io()
  }
}
</script>
