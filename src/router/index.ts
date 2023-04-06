import { createRouter, createWebHistory } from 'vue-router';
const Main = () => import('@/Pages/Main.vue');
const Poet = () => import('@/Pages/Poet.vue');
const Poem = () => import('@/Pages/Poem.vue');
const About = () => import('@/Pages/About.vue');
// Guest_Page
const Guest_Ordering = () => import('@/Pages/Guest/Ordering.vue');
const Guest_History = () => import('@/Pages/Guest/History.vue');
// Partners__Pages
const Index = () => import('@/Pages/Partners/Index.vue');
const Auth = () => import('@/Pages/Partners/Auth.vue');
const Partner_Ordering = () => import('@/Pages/Partners/Ordering.vue');
const Partner_History = () => import('@/Pages/Partners/History.vue');

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
  // Partners
  {
    // show different routes after authenticating partners like /partners/orders instead of /orders
    // you can have nested routes
    path: '/partners',
    name: 'partners',
    component: Index,
    children: [
      // paths that start with / will be treated as root paths. This allows you to leverage the component nesting without having to use a nested URL.
      {
        path: '',
        name: 'auth',
        component: Auth,
      },
      {
        path: 'ordering',
        name: 'Partner_Ordering',
        component: Partner_Ordering,
      },
      {
        path: 'history',
        name: 'Partner_History',
        component: Partner_History,
      },
    ],
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
