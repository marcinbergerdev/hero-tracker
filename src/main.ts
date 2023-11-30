import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

import './assets/scss/global.scss';

import App from './App.vue'
import BaseButton from './components/cards/BaseButton.vue'

const app = createApp(App);
const pinia = createPinia()



app.use(router);
app.use(pinia);

app.component('BaseButton', BaseButton);

app.mount('#app');



