import type { RouteRecordRaw } from 'vue-router';

import Home from '@/pages/Home.vue';
import Cards from '@/pages/Cards.vue';
import About from '@/pages/About.vue';
import Decks from '@/pages/Decks.vue';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/cards',
    component: Cards,
  },
  {
    path: '/cards/:id',
    component: About,
  },
  {
    path: '/decks',
    component: Decks,
  },
];

export default routes;
