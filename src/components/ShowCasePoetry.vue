<template>
    <section id="poetry">
        <h2 class="title">المختارات الأدبية<span v-if="poetry.length === 0"><br>(غير متوفرة الي الأن)</span></h2>
        <div class="poetry-container">
            <div v-for="singlePiece in poetry" :key="singlePiece._id" class="poetry-item">
                <div v-if="singlePiece.qoute" class="prose-item">
                    <p class="qoute">{{ singlePiece.qoute }}</p>
                    <router-link v-if="!(routeName === 'poet')"
                        :to="'/poets/' + singlePiece.poet._id" class="details">{{
                        singlePiece.poet.name}}
                    </router-link>

                    <button @click="$emit('print', { _id: singlePiece._id, qoute: singlePiece.qoute })"
                        class="print-button">
                        أضف للطباعة
                    </button>
                </div>
                <div v-if="singlePiece.verses" class="chosenverse-item">
                    <div v-for="verse, index in singlePiece.verses" :key="index"
                        :class="singlePiece.verses.length == 1 ? 'one-verse' : 'two-verse'">
                        <p class="first">{{ verse.first }}</p>
                        <p class="sec">{{ verse.sec }}</p>
                    </div>
                    <router-link :to="'/poems/' + singlePiece.poem" class="details">{{
                        routeName == 'poet'
                        ? 'القصيدة الكاملة'
                        : singlePiece.poet.name + ' - القصيدة الكاملة'}}
                    </router-link>
                    <button
                        @click="$emit('print', { _id: singlePiece._id, verses: singlePiece.verses })"
                        class="print-button">
                        أضف للطباعة
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>


<script lang="ts" setup>
// Types
import type { Poetry } from '../stores/__types__';

defineProps<{
    poetry: Poetry[];
    routeName?: string
}>()

defineEmits(['print']);
</script>

<style lang="scss" scoped>
@import '../assets/mixins.scss';

$mainColor: var(--text1);
$secondaryColor: var(--surface1);
.title {
  text-align: center;
  background-color: $secondaryColor;
  color: $mainColor;
  padding: 0.3rem;
  margin: 1rem 0.3rem 0;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;

  @include mQ($breakpoint-lg) {
    padding: 0.3rem;
    margin: 0.6rem 0.3rem 0;
    font-size: 1.3rem;
  }

  @include mQ($breakpoint-md) {
    padding: 0.2rem;
    margin: 0.5rem 0.2rem 0;
    font-size: 1.2rem;
  }

  @include mQ($breakpoint-sm) {
    padding: 0.1rem;
    font-size: 1rem;
  }
}

.poetry-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @include mQ($breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mQ($breakpoint-sm) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.poetry-item {
   margin: 0.5rem;
}

.prose-item, .chosenverse-item {
    height: 90%;
    .details {
        font-size: 1rem;
        text-decoration: none;
        color: $mainColor;
        position: absolute;
        bottom: 0.7rem;
        right: 0.7rem;

        &:hover {
            font-weight: 600;
        }

        @include mQ($breakpoint-lg) {
            font-size: 0.8rem;
        }

        @include mQ($breakpoint-sm) {
            font-size: 0.6rem;
        }
    }
    .print-button {
        color: $mainColor;
        background: $secondaryColor;
        border: 1px solid $mainColor;
        position: absolute;
        bottom: 0.7rem;
        left: 0.7rem;
        border-radius: 1.5rem;
        padding: 0.3rem;
        margin-top: 0.5rem;
        &:hover {
            background: $mainColor;
            color: $secondaryColor;
        }
        @include mQ($breakpoint-sm) {
            font-size: 0.5rem;
        }
        @include mQ($breakpoint-md) {
            font-size: 0.6rem;
        }
        @include mQ($breakpoint-lg) {
            font-size: 0.6rem;
        }
    }
}

.prose-item {
  color: $mainColor;
  background: $secondaryColor;
  position: relative;
  display: flex;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 1.5rem;
  padding: 0.3rem;
  padding-bottom: 1.5rem;

  @include mQ($breakpoint-md) {
    padding: 0.3rem;
    margin: 0.3rem;
  }

  @include mQ($breakpoint-sm) {
    padding: 0.1rem;
    padding-bottom: 0.3rem;
    margin: 0.2rem;
  }

  .qoute {
    width: 100%;
    text-align: center;
    place-self: center;
    font-size: 1.2rem;
    
    @include mQ($breakpoint-lg) {
      font-size: 1.1rem;
    }

    @include mQ($breakpoint-md) {
      font-size: 1rem;
    }

    @include mQ($breakpoint-sm) {
      font-size: 0.8rem;
    }
  }
}
.chosenverse-item {
  color: $mainColor;
  background: $secondaryColor;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 1.5rem;
  padding: 0.3rem;
  padding-bottom: 1.5rem;

  @include mQ($breakpoint-lg) {
    padding: 0.3rem;
    padding-bottom: 1.4rem;
    margin: 0.3rem;
  }

  @include mQ($breakpoint-md) {
    padding: 0.2rem;
    padding-bottom: 1.2rem;
    margin: 0.3rem;
  }

  @include mQ($breakpoint-sm) {
    padding: 0.1rem;
    padding-bottom: 1.2rem;
    margin: 0.2rem;
  }

  .one-verse {
    font-size: 1.1rem;
    font-weight: 600;
    margin: auto 0;

    .first {
      margin-right: 0.4rem;
    }

    .sec {
      margin-left: 0.4rem;
      direction: ltr;
    }

    @include mQ($breakpoint-lg) {
      font-size: 0.95rem;
      margin-top: 1.2rem;
    }

    @include mQ($breakpoint-md) {
      font-size: 0.9rem;
      margin-top: 1rem;
    }

    @include mQ($breakpoint-sm) {
      font-size: 0.8rem;
      margin-top: 0.5rem;
    }
  }

  .two-verse {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.3rem;

    .first {
      margin-right: 0.4rem;
    }

    .sec {
      margin-left: 0.4rem;
      direction: ltr;
    }

    @include mQ($breakpoint-lg) {
      font-size: 0.95rem;
    }

    @include mQ($breakpoint-md) {
      font-size: 0.8rem;
    }

    @include mQ($breakpoint-sm) {
      font-size: 0.8rem;
    }
  }
}
</style>