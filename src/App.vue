<script setup lang="ts">
// components
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import HttpPopUp from './components/NotificationsCenter/HttpPopUp.vue';
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
  <Footer />
</template>

<style lang="scss" scoped>
@import './assets/mixins.scss';
@include fade-transition;
</style>