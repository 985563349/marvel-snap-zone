import { createApp } from 'vue';
import VueLazyLoad from 'vue-lazyload';
import 'uno.css';
import '@unocss/reset/tailwind.css';

import router from './router';
import App from './App.vue';

import loadimage from './assets/card_back.webp';

createApp(App)
  .use(router)
  .use(VueLazyLoad, {
    preLoad: 1.3,
    error: loadimage,
    loading: loadimage,
    attempt: 1,
  })
  .mount('#app');
