<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
// components
import Navbar from './components/Navbar.vue';
// import Footer from './components/Footer.vue';
const HttpPopUp = defineAsyncComponent(() => import('./components/NotificationsCenter/HttpPopUp.vue'))
</script>

<template>
  <header>
    <Navbar />
    <HttpPopUp />
  </header>
  <router-view v-slot="{ Component }">
    <transition name="fade" appear>
      <component :is="Component" />
    </transition>
  </router-view>
  <footer>
    <p>
      Copyright &copy; 2022 |
      <a href="#" title="Github profile" class="profile">M. Shrief</a>
    </p>
  </footer>
</template>

<style lang="scss" scoped>
@import './assets/mixins.scss';
@include fade-transition;

footer {
  text-align: center;
  margin-top: 1.6rem;
  font-size: 1.2rem;
  font-weight: 700;

  .profile {
    color: #004e64;
    text-decoration: none;
  }

  @include mQ($breakpoint-sm) {
    margin-top: 1rem;
    font-size: 1rem;
  }
}
</style>