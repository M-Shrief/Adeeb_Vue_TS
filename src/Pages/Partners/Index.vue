<template>
  <main dir="rtl">
    <router-view v-slot="{ Component }">
      <transition name="fade" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <!-- Feature: Adding the capability to make a big order for partner/company
      - make random getRequest based on some filters (tags, time_period, poet)
      - viewed like ShowCasePoetry with removeButton 
      - ability to chose the color and font for each group
      - section to generate randomPoetry/randomProse to add from it
      - Add products by group like (white/black group then blue/white group and on)-->
</template>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';
@include fade-transition;
</style>
