<template>
  <div class="dashboard">
   <div class="dashboard__header">
     <h1 class="dashboard__title">Dashboard</h1>
   </div>
    <div class="dashboard__content">
      <div class="dashboard__content__item">
        <h2 class="dashboard__content__item__title">CPU Usage</h2>
        <div class="dashboard__content__item__value" id="cpu-progress"></div>
      </div>
      <div class="dashboard__content__item">
        <h2 class="dashboard__content__item__title">RAM Usage</h2>
        <div class="dashboard__content__item__value" id="ram-progress"></div>
      </div>
      <div class="dashboard__content__item">
        <h2 class="dashboard__content__item__title">Average Player count</h2>
        <div class="dashboard__content__item__value" id="player-count"></div>
      </div>
      <div class="dashboard__content__item">
        <h2 class="dashboard__content__item__title">Average TPS</h2>
        <div class="dashboard__content__item__value" id="tps"></div>
      </div>
      <div class="dashboard__content__item">
        <h2 class="dashboard__content__item__title">Average Ping</h2>
        <div class="dashboard__content__item__value" id="ping"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {IP} from "../main.js";
import progressbar from "progressbar.js";

export default {
  name: "Dashboard",

  data() {
    return {
      serverStatus: {
        cpuUsage: 0,
        ramUsage: 0
      },
      cpuBar: null,
      ramBar: null
    }
  },

  mounted() {
    // Fetch server status data every 5 seconds
    const ProgressBar = progressbar;
    let options = {
      color: '#aaa',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 4,
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 1400,
      text: {
        autoStyleContainer: true
      },
      from: {color: '#026900', width: 3},
      to: {color: '#ff0000', width: 4},
      // Set default step function for all animate calls
      step: (state, circle) => {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        const value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value + '%');
        }

      }
    };
    // Assuming we have an empty <div id="container"></div> in
    // HTML
    this.cpuBar = new ProgressBar.Circle('#cpu-progress', options);
    this.cpuBar.animate(0);  // Number from 0.0 to 1.0
    this.ramBar  = new ProgressBar.Circle('#ram-progress', options);
    this.ramBar.animate(0);  // Number from 0.0 to 1.0
    this.fetchServerStatus();
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
            this.serverStatus.cpuUsage = data.cpu.usage;
            this.serverStatus.ramUsage = data.ram;
            this.cpuBar.animate(data.cpu.usage / 100);
            this.ramBar.animate(data.ram / 100);
          })
          .catch(error => console.error(error));
    }
  }
}
</script>

<style scoped>

.dashboard {
  display: flex;
  flex-direction: column;
  height: 100%;
  /* put on top left */
  position: absolute;
  top: 10%;
  left: 10%;
  /* restrict the height */
  max-height: 80%;
}

.dashboard__header {
  display: flex;
  width: 100%;
  height: 10%;
}

.dashboard__title {
  font-size: 2rem;
  font-weight: 600;
}

.dashboard__content {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 90%;
  /* maximum amount of items in row */
  flex-wrap: wrap;

}

.dashboard__content__item {
  display: grid;
  flex-direction: column;
  align-items: center;
  width: 20%;
  height: 30%;
  grid-template-areas:
    "title"
    "value";
  padding: 0 1rem 1rem 1rem;
  background-color: #1a1a1a;
  transition: transform 0.2s ease-in-out;
  border-radius: 5px;
  min-width: 300px;
}

.dashboard__content__item:hover {
  transform: scale(1.05);
}

.dashboard__content__item__title {
  font-size: 1.5rem;
  font-weight: 600;
  user-select: none;
}

.dashboard__content__item__value {
  width: 100%;
  height: 100%;
}

#cpu-progress {
  width: 60%;
  /*center the bar*/
  margin: 0 auto;
}

#ram-progress {
  width: 60%;
  /*center the bar*/
  margin: 0 auto;
}

@media (max-width: 768px) {
  .dashboard {
    /* center all items because the items are slightly shifted to the right */
    transform: translate(-4%, 1%);
  }

  .dashboard__content {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    flex-wrap: nowrap;
  }

  .dashboard__content__item {
    width: 100%;
    height: 80%;
    margin-bottom: 2rem;

  }
}
</style>