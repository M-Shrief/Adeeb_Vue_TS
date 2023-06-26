<template>
  <header>
    <Navbar :partner="partner" @logout="logout" />
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
      <a href="#" title="Github profile" id="profile">M. Shrief</a>
    </p>
  </footer>
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed, provide, readonly } from 'vue';
import { useRouter } from 'vue-router';
// Stores
import { usePartnerStore } from '@/stores/partners';
// components
import Navbar from './components/Navbar.vue';
// import Footer from './components/Footer.vue';
const HttpPopUp = defineAsyncComponent(() => import('./components/NotificationsCenter/HttpPopUp.vue'))


const router = useRouter();

const parnterStore = usePartnerStore();

// For Navbar
const partner = computed(() => {
  return parnterStore.getPartner
})
async function logout() {
  parnterStore.logout()
  router.push('/');
}

// For Main, Poem, Poet pages.
const isPartner = computed(() => {
  return parnterStore.getPartner ? true : false;
})
provide('isPartner', readonly(isPartner));
</script>


<style lang="scss" scoped>
@import './assets/mixins.scss';
@include fade-transition;

footer {
  text-align: center;
  margin-top: 1.6rem;
  font-size: 1.2rem;
  font-weight: 700;

  #profile {
    color: #f6b352;
    text-decoration: none;
  }

  @include mQ($breakpoint-sm) {
    margin-top: 1rem;
    font-size: 1rem;
  }
}
</style>