<template>
  <main>
    <div class="container" dir="rtl">
      <section id="related-data" v-if="getPoem.poet">
        <router-link :to="'/poet/' + getPoem.poet._id" class="link">
          <ShowCasePoet :details="getPoem.poet" />
        </router-link>

        <ShowCasePoems :poems="getPoems">
          <h2>قصائد اخري</h2>
        </ShowCasePoems>
      </section>
      <ShowCasePoem :verses="getPoem.verses"
        @print="(print: Print) => addPrint({ poem: getPoem._id, ...print })" />
    </div>
    <SelectedPrints />
  </main>
</template>

<script lang="ts" setup>
import { onBeforeMount, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
// stores
import { usePoemStore } from '@/stores/poems';
import { usePrintStore } from '@/stores/prints';
// components
import ShowCasePoems from '@/components/ShowCasePoems.vue';
import ShowCasePoem from '@/components/ShowCasePoem.vue';
import ShowCasePoet from '@/components/ShowCasePoet.vue';
import SelectedPrints from '../components/SelectedPrints.vue';
// Types
import type { Print } from '@/stores/__types';

const route = useRoute();

const poemStore = usePoemStore();
const getPoem = computed(() => {
  return poemStore.getPoem;
});
const getPoems = computed(() => {
  return poemStore.getPoems;
});

watch(
  () => route.params.id,
  (newPoemId) => {
    poemStore.fetchPoemAndSuggestedPoems(route.params.id);
  }
);

onBeforeMount(() => {
  poemStore.fetchPoemAndSuggestedPoems(route.params.id);
});

const printsStore = usePrintStore();
function addPrint(print: Print) {
  return printsStore.addPrint(print);
}
</script>


<style lang="scss" scoped>
@import '../assets/mixins.scss';

.container {
  display: grid;
  grid-template-columns: 40% 60%;
  margin: 1rem;
}

#related-data {
  .link {
    text-decoration: none;
  }

  h2 {
    color: #f6b352;
    text-align: center;

    @include mQ($breakpoint-lg) {
      font-size: 1.1rem;
    }

    @include mQ($breakpoint-md) {
      font-size: 1rem;
    }

    @include mQ($breakpoint-sm) {
      font-size: 1rem;
    }
  }
}
</style>
