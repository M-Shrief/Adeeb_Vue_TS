<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
// components
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import SelectedPrints from './components/SelectedPrints.vue';

const route = useRoute();
</script>

<template>
  <header>
    <Navbar />
  </header>
  <router-view v-slot="{ Component }">
    <transition name="fade" appear>
      <component :is="Component" />
    </transition>
  </router-view>
  <KeepAlive>
    <SelectedPrints dir="rtl" v-if="route.name != 'printing'" />
  </KeepAlive>
  <Footer />
</template>

<style lang="scss" scoped>
@import './assets/mixins.scss';
@include fade-transition;
</style>