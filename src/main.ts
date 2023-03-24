import { createApp, provide, h } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import router from './router';
import App from './App.vue';
import './assets/base.css';
import 'normalize.css';
// import {
//   ApolloClient,
//   createHttpLink,
//   InMemoryCache,
// } from '@apollo/client/core';
// import { DefaultApolloClient } from '@vue/apollo-composable';

// HTTP connection to the API
// const httpLink = createHttpLink({
//// You should use an absolute URL here
//   uri: 'http://localhost:4000/graphql',
// });

// Cache implementation
// const cache = new InMemoryCache();

// Create the apollo client
// const apolloClient = new ApolloClient({
//   link: httpLink,
//   cache,
// });

// const app = createApp({
//   setup() {
//     provide(DefaultApolloClient, apolloClient);
//   },

//   render: () => h(App),
// });

// persist selected stores (prints) on sessionStorage
const pinia = createPinia().use(piniaPluginPersistedstate);

createApp(App).use(pinia).use(router).mount('#app');
