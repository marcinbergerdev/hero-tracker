import { createApp } from 'vue'
import router from './router'

import './assets/scss/global.scss';
import App from './App.vue'

import BaseButton from './components/cards/BaseButton.vue'

const app = createApp(App);


app.use(router);

app.component('BaseButton', BaseButton);

app.mount('#app');



