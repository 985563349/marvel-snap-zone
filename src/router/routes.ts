import type { RouteRecordRaw } from 'vue-router';

import Home from '@/pages/Home.vue';
import Cards from '@/pages/Cards/index.vue';
import Card from '@/pages/Card/index.vue';
import Decks from '@/pages/Decks/index.vue';

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
    component: Card,
  },
  {
    path: '/decks',
    component: Decks,
  },
];

export default routes;
