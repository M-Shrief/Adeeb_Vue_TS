<template>
  <main>
    <div class="container" dir="rtl">
      <!-- <section id="related-data" v-if="getPoem.poet">
        <router-link :to="'/poet/' + getPoem.poet._id" class="link">
          <ShowCasePoet :details="getPoem.poet" />
        </router-link>

        <ShowCasePoems :poems="getPoems">
          <h2>قصائد اخري</h2>
        </ShowCasePoems>
      </section> -->
      <!-- <ShowCasePoem
        :verses="getPoem.verses"
        @print="(print) => addPrint({ Poem: getPoem._id, ...print })"
      /> -->
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const route = useRoute();

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
