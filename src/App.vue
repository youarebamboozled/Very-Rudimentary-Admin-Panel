<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Menu from './components/Menu.vue'
import Home from './components/Dashboard.vue'
import Login from "./components/Login.vue";
</script>

<template>
  <Menu />
  <div id="container" class="container">
    <router-view />
  </div>
</template>


<script>
import {router} from "./main.js";

function isCookieValid(cookieName) {
  let cookie = document.cookie.split(';').find(row => row.trim().startsWith(cookieName + '='));
  return !!cookie;
}


export default {
  name: 'App',
  components: {
    Home,
    Login,
  },

  mounted() {
    // if window location changes check again
    router.afterEach((to, from) => {
      if (window.location.pathname !== '/login') {
        if (isCookieValid("api_token") === false) {
          //router.push('/login') // TODO: redirect to login page
        }
      }
    });

  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
}
</style>
