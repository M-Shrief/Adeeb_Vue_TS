<template>
  <main dir="rtl">
    <router-view v-slot="{ Component }">
      <transition name="fade" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';
@include fade-transition;
</style>
