import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import Login from "./components/Login.vue";
import Home from "./components/Home.vue";


export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: Home},
        {path: '/login', component: Login}
    ]
})

createApp(App).use(router).mount('#app')
