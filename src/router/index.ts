import { createRouter, createWebHistory } from 'vue-router';
const Main = () => import('@/Pages/Main.vue');
const Poet = () => import('@/Pages/Poet.vue');
const Poem = () => import('@/Pages/Poem.vue');
const Printing = () => import('@/Pages/Printing.vue');
const Orders = () => import('@/Pages/Orders.vue');
const About = () => import('@/Pages/About.vue');
const Partners = () => import('@/Pages/Partners.vue');

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
  },
  {
    path: '/poet/:id',
    name: 'poet',
    component: Poet,
  },
  {
    path: '/poem/:id',
    name: 'poem',
    component: Poem,
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/printing',
    name: 'printing',
    component: Printing,
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
  },
  {
    path: '/partners',
    name: 'partners',
    component: Partners,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

export default router;
