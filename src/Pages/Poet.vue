<template >
  <!-- don't add a poet without a poem to maintain the layout -->
  <main>
    <div v-if="getPoet" dir="rtl">
      <div class="container">
        <ShowCasePoet :details="getPoet.details" />

        <ShowCasePoems :poems="getPoet.authoredPoems">
          <h3 class="poems-title">قصائده</h3>
        </ShowCasePoems>
      </div>

      <!-- Add Pagination for poetry and proses -->
      <ShowCasePoetry :chosen-verses="getPoet.authoredChosenVerses"
        :route-name="'poet'" @print="(print: Print) => addPrint(print)" />

      <ShowCaseProse :proses="getPoet.authoredProses" :route-name="'poet'"
        @print="(print: Print) => addPrint(print)" />
    </div>
    <SelectedPrints :prints="getPrints" @remove="(print) => removePrint(print)"
      :is-partner="isPartner" />
  </main>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
// stores
import { usePoetStore } from "@/stores/poets";
import { usePrintsStore } from "@/stores/prints";
import { usePartnerStore } from '@/stores/partners';
// types
import type { Print } from '@/stores/__types__';
// components
import ShowCasePoet from '@/components/ShowCasePoet.vue';
import ShowCasePoems from '@/components/ShowCasePoems.vue';
import ShowCasePoetry from '@/components/ShowCasePoetry.vue';
import ShowCaseProse from '@/components/ShowCaseProse.vue';
import SelectedPrints from '@/components/SelectedPrints.vue';

const poetStore = usePoetStore();
const getPoet = computed(() => {
  return poetStore.getPoet
})
const route = useRoute();
onMounted(() => {
  poetStore.fetchPoet(route.params.id);
})

// Should use Provide/Inject
const printsStore = usePrintsStore();
const getPrints = computed(() => {
  return printsStore.getPrints;
});

function addPrint(print: Print) {
  return printsStore.addPrint(print);
}

function removePrint(print: Print) {
  return printsStore.removePrint(print);
}

const partnerStore = usePartnerStore();
const isPartner = computed(() => {
  return partnerStore.getPartner ? true : false;
})

</script>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

.container {
  display: grid;
  grid-template-columns: 70% 30%;
  border-radius: 1rem;
  padding: 0.7rem;
  margin: 0.7rem 0.3rem;
  overflow: visible;

  @include mQ($breakpoint-lg) {
    padding: 0.6rem;
    margin: 0.6rem 0.3rem;
  }

  @include mQ($breakpoint-md) {
    padding: 0.5rem;
    margin: 0.5rem 0.2rem;
  }

  @include mQ($breakpoint-sm) {
    padding: 0.3rem;
    margin: 0.3rem 0.1erm;
  }
}

.poems-title {
  background-color: #fbe6c2;
  color: #181823;
  text-align: center;
  padding: 0.3rem;
  border-radius: 1.5rem;
  width: 50%;
  margin: 1rem auto;

  @include mQ($breakpoint-lg) {
    padding: 0.3rem;
    margin: 0.7rem auto;
    font-size: 1rem;
  }

  @include mQ($breakpoint-md) {
    padding: 0.2rem;
    margin: 0.5rem auto;
    font-size: 1rem;
  }

  @include mQ($breakpoint-sm) {
    padding: 0.1rem;
    margin: 0.3rem auto;
    font-size: 1rem;
  }
}
</style>