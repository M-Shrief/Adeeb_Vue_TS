<template>
  <main dir="rtl">
    <h1>أديب</h1>
    <p>لطباعة الادب العربي شعراً ونثراً</p>
    <div class="container">
      <!-- Add Pagination -->
      <ShowCasePoems :poems="getPoems" :grid="'grid'">
        <h2 class="poems-title">القصائد</h2>
      </ShowCasePoems>

      <ShowCasePoets :poets="getPoets">
        <h2 class="poets-title">الشعراء</h2>
      </ShowCasePoets>
    </div>

      <ShowCasePoetry :poetry="getPoetry" :routeName="'main'"
      @print="(print: Print) => addPrint(print)" />
    <SelectedPrints :prints="getPrints" @remove="(print) => removePrint(print)"
      :is-partner="isPartner" />
  </main>
</template>
<script lang="ts" setup>
import { onMounted, computed, inject } from 'vue';
// stores
import { usePoemStore } from '@/stores/poems';
import { usePoetStore } from '@/stores/poets';
import { usePoetryStore } from '@/stores/poetry';
import { usePrintsStore } from '@/stores/prints';
// Types
import type { Print } from '@/stores/__types__';
// components
import ShowCasePoems from '@/components/ShowCasePoems.vue';
import ShowCasePoets from '@/components/ShowCasePoets.vue';
import ShowCasePoetry from '@/components/ShowCasePoetry.vue';
// import ShowCaseChosenVerse from '@/components/ShowCaseChosenVerse.vue';
// import ShowCaseProse from '@/components/ShowCaseProse.vue';
import SelectedPrints from '@/components/SelectedPrints.vue';

const poemsStore = usePoemStore();
const getPoems = computed(() => {
  return poemsStore.getPoems;
});

const poetsStore = usePoetStore();
const getPoets = computed(() => {
  return poetsStore.getPoets;
});

const poetryStore = usePoetryStore();
const getPoetry = computed(() => {
  return poetryStore.getPoetry;
});

onMounted(() => {
  poemsStore.fetchPoems();
  poetsStore.fetchPoets();
  poetryStore.fetchPoetry();
});
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

const isPartner = inject('isPartner') as boolean;
</script>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

h1,
p {
  text-align: center;
}

h1 {
  font-size: 4rem;
}

p {
  font-size: 1.5rem;
}

.container {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 70% 30%;
}

.poems-title,
.poets-title {
  text-align: center;
  padding: 0.3rem;
  border-radius: 1.5rem;
  width: 50%;
  margin: 1rem auto;
}

.poems-title {
  background-color: var(--text1);
  color: var(--surface3);
}

.poets-title {
  background-color: var(--text1);
  color: var(--surface2);
}

@include mQ($breakpoint-lg) {
  h1 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1.5rem;
  }

  .container {
    grid-template-columns: 65% 35%;
  }

  .poems-title,
  .poets-title {
    padding: 0.3rem;
    margin: 0.6rem auto;
    font-size: 1.3rem;
  }
}

@include mQ($breakpoint-md) {
  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1.2rem;
  }

  .container {
    grid-template-columns: 65% 35%;
  }

  .poems-title,
  .poets-title {
    padding: 0.2rem;
    margin: 0.5rem auto;
    font-size: 1.2rem;
  }
}

@include mQ($breakpoint-sm) {
  h1 {
    font-size: 1.6rem;
  }

  p {
    font-size: 1rem;
  }

  .container {
    grid-template-columns: 65% 35%;
  }

  .poems-title,
  .poets-title {
    padding: 0.1rem;
    margin: 0.3rem auto;
    font-size: 1rem;
  }
}
</style>
