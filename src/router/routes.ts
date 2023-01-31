import type { RouteRecordRaw } from 'vue-router';

import Home from '../pages/Home.vue';
import About from '../pages/About.vue';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/:id',
    component: About,
  },
];

export default routes;
