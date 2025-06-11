import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
// import iconSvg from "./components/icon.vue";
const app = createApp(App);
// app.component('iconSvg', iconSvg)
app.use(router).mount('#app')