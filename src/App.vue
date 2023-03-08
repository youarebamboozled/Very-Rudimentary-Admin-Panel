<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Menu from './components/Menu.vue'
</script>

<template>
  <Menu />
  <div id="container" class="container">
    <HelloWorld msg="Welcome to Your Vue.js + Vite App" />
  </div>
</template>


<script>
import {router} from "./main.js";

let $cookies;
export default {
  name: 'App',
  components: {
    HelloWorld,
    Menu
  },

  mounted() {
    // check if on login page if not and cookie is not use router to redirect to login page
    console.log(window.location.pathname)
    if (window.location.pathname !== '/login') {
      if (true) {
        router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 5%;
}
</style>
