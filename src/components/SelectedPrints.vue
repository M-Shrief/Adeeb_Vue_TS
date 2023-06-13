<template>
  <div id="selected-prints" dir="rtl">
    <p><router-link :to="partner ? '/partners/ordering' : '/ordering'"
        class="title">للطباعة</router-link> </p>
    <ul class="prints">
      <li class="prints-item" v-for="print in getPrints" :key="print._id"
        @dblclick="removePrint(print)">
        <!-- poetry -->
        <p v-if="print.verses">{{ print.verses[0].first }}..</p>
        <!-- prose -->
        <p v-else-if="print.qoute">{{ print.qoute.slice(0, 15) }}..</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
// stores
import { usePrintsStore } from '@/stores/prints';
import { usePartnerStore } from '@/stores/partners';
// types
import type { Print } from '@/stores/__types__';

const partnerStore = usePartnerStore();
const partner = computed(() => {
  return partnerStore.getPartner;
})

const printsStore = usePrintsStore();
const getPrints = computed(() => {
  return printsStore.getPrints;
});
function removePrint(print: Print) {
  return printsStore.removePrint(print);
}
</script>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

$mainColor: #fbe6c2;
$secondaryColor: #181D23;

#selected-prints {
  position: fixed;
  bottom: 0.3rem;
  right: 0.1rem;
  display: flex;
  flex-direction: row;
  background: $secondaryColor;
  padding: 0.3rem 0.7rem;
  border-radius: 2rem;

  @include mQ($breakpoint-lg) {
    padding: 0.2rem 0.5rem;
  }

  @include mQ($breakpoint-md) {
    padding: 0.2rem 0.4rem;
  }

  @include mQ($breakpoint-sm) {
    padding: 0.1rem 0.3rem;
  }

  .title {
    margin-left: 0.3rem;
    font-weight: 600;
    color: rgba($color: $mainColor, $alpha: 0.8);
    text-decoration: none;

    &:hover {
      color: $mainColor;
    }

    @include mQ($breakpoint-lg) {
      margin-left: 0.3rem;
      font-size: 1rem;
    }

    @include mQ($breakpoint-md) {
      margin-left: 0.2rem;
      font-size: 0.9rem;
    }

    @include mQ($breakpoint-sm) {
      margin-left: 0.1rem;
      font-size: 0.8rem;
    }
  }

  .prints {
    display: flex;
    flex-direction: row;
    list-style: none;

    .prints-item {
      padding: 0.2rem;
      margin-left: 0.3rem;
      background: rgba($color: $mainColor, $alpha: 0.8);
      color: $secondaryColor;
      cursor: pointer;

      p {
        display: none;
        padding: 0.25rem;
      }

      &:hover {
        p {
          display: inline;
          padding: 0rem;
          font-weight: 600;
        }
      }

      @include mQ($breakpoint-sm) {
        padding: 0.1rem;

        &:hover p {
          font-size: 0.8rem;
        }
      }
    }
  }
}
</style>
