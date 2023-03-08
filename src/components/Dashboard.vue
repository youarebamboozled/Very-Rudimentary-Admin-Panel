<template>
  <div class="dashboard">
   <div class="dashboard__header">
     <h1 class="dashboard__title">Dashboard</h1>
   </div>
    <div class="dashboard__content">
      <div class="dashboard__content__item">
        <h2 class="dashboard__content__item__title">CPU Usage</h2>
        <div class="dashboard__content__item__value">{{ serverStatus.cpuUsage }}%</div>
      </div>
      <div class="dashboard__content__item">
        <h2 class="dashboard__content__item__title">RAM Usage</h2>
        <div class="dashboard__content__item__value">{{ serverStatus.ramUsage }}%</div>
      </div>
    </div>
  </div>
</template>

<script>
import {IP} from "../main.js";

export default {
  name: "Dashboard",

  data() {
    return {
      serverStatus: {
        cpuUsage: 0,
        ramUsage: 0
      }
    }
  },

  mounted() {
    // Fetch server status data every 5 seconds
    setInterval(this.fetchServerStatus, 5000);
  },

  beforeRouteLeave() {
    clearInterval(this.fetchServerStatus);
  },

  methods: {
    fetchServerStatus() {
      fetch(IP + "/api/v1/server-resources", {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + document.cookie.split(';').find(row => row.trim().startsWith('api_token=')).split('=')[1]
        }
      })
          .then(response => response.json())
          .then(data => {
            this.serverStatus.cpuUsage = data.cpuUsage;
            this.serverStatus.ramUsage = data.ramUsage;
          })
          .catch(error => console.error(error));
    }
  }
}
</script>

<style scoped>

</style>