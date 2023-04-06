import { createApp, provide, h } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import router from './router';
import App from './App.vue';
import './assets/base.css';
import 'normalize.css';

const pinia = createPinia().use(piniaPluginPersistedstate);

createApp(App).use(pinia).use(router).mount('#app');
