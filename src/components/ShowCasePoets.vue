<template>
  <section id="poets">
    <slot />
    <div class="grid">
      <router-link v-for="poet in poets" :key="poet._id" :to="`/poet/${poet._id}`"
        class="poet" replace>
        <p>{{ poet.name }}</p>
      </router-link>
    </div>
  </section>
</template>

<script lang="ts" setup>
// types
import type { Poet } from '@/stores/__types__';
defineProps({
  poets: {
    type: Array<Poet['details']>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

// $mainColor: #2c3e50;
// $secondaryColor: #fbe6c2;

$mainColor: var(--text1-dark);
$secondaryColor: var(--surface2-dark);

#poets {
  background-color: $secondaryColor;
  padding: 0.3rem;
  border-radius: 2rem;
  margin: 0 1rem;

  .poet {
    color: $mainColor;
    text-decoration: none;
    font-size: 1.1rem;
    margin: 0.3rem;

    &:hover {
      font-weight: 700;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

@include mQ($breakpoint-lg) {
  #poets {
    padding: 0.3rem;
    margin: 0 0.6rem;

    .poet {
      font-size: 1rem;
      margin: 0.3rem;
    }

    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@include mQ($breakpoint-md) {
  #poets {
    padding: 0.2rem;
    margin: 0 0.5rem;

    .poet {
      font-size: 0.9rem;
      margin: 0.2rem;
    }

    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@include mQ($breakpoint-sm) {
  #poets {
    padding: 0.1rem;
    margin: 0 0.3rem;

    .poet {
      font-size: 0.8rem;
      margin: 0.1rem;
    }

    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
