import { createRouter, createWebHistory } from 'vue-router';
const Main = () => import('@/Pages/Main.vue');
const Poet = () => import('@/Pages/Poet.vue');
const Poem = () => import('@/Pages/Poem.vue');
const About = () => import('@/Pages/About.vue');
// Guest_Page
const Guest_Ordering = () => import('@/Pages/Guest/Ordering.vue');
const Guest_History = () => import('@/Pages/Guest/History.vue');

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
  // Guests
  {
    path: '/ordering',
    name: 'Guest_Ordering',
    component: Guest_Ordering,
  },
  {
    path: '/history',
    name: 'Guest_History',
    component: Guest_History,
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
