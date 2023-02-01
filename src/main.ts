import { createApp } from 'vue';
import VueLazyLoad from 'vue-lazyload';
import 'uno.css';
import '@unocss/reset/tailwind.css';

import router from './router';
import App from './App.vue';

createApp(App)
  .use(router)
  .use(VueLazyLoad, {
    preLoad: 1.3,
    attempt: 1,
  })
  .mount('#app');
