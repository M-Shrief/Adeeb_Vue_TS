<template>
  <main id="printing" dir="rtl">
    <div class="container">
      <section id="preview">
        <h3>اختر من الاشعار للطباعة</h3>
        <PrintCustomization :colors="colors"
          @fontColor="(color: string) => fontColor = color"
          @backgroundColor="(color: string) => backgroundColor = color" />
        <div v-if="preview.verses" v-for="verse in preview.verses"
          :key="verse._id" class="verse" id="print"
          :style="{ color: fontColor, background: backgroundColor }">
          <p>{{ verse.first }}</p>
          <p dir="ltr">{{ verse.sec }}</p>
        </div>
        <div v-else-if="preview.qoute" class="qoute" id="print"
          :style="{ color: fontColor, background: backgroundColor }">
          <p>{{ preview.qoute }}</p>
        </div>
        <button @click="addProduct(preview, [fontColor, backgroundColor])">اضافة
          الطلب</button>
        <div>
        </div>
      </section>
      <OrderForm :products="getProducts" />
    </div>

    <section id="prints">
      <h3>المختار للطباعة</h3>
      <div id="randoms">
        <div id="buttons">
          <button @click="getRandomPoetry(1)">شعر عشوائي</button>
          <button @click="getRandomProse(1)">نثر عشوائي</button>
        </div>
        <div v-if="randomPrint">
          <div @click="preview = randomPrint">
            <div v-if="randomPrint.verses" v-for="verse in randomPrint.verses"
              :key="verse._id" class="verse">
              <p>{{ verse.first }}</p>
              <p dir="ltr">{{ verse.sec }}</p>
            </div>
            <div v-else-if="randomPrint.qoute" class="qoute">
              <p>{{ randomPrint.qoute }}</p>
            </div>
          </div>
        </div>
      </div>
      <ShowCasePrints :prints="getPrints" @remove="(print) => removePrint(print)"
        @print="(print: Print) => preview = print" />
    </section>
  </main>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
// stores
import { usePrintsStore } from "@/stores/prints";
import { useChosenVerseStore } from "@/stores/chosenVerses";
import { useProseStore } from "@/stores/proses";
import { useOrderStore } from '@/stores/orders';
// components
import PrintCustomization from '@/components/PrintCustomization.vue';
import OrderForm from "@/components/OrderForm.vue";
import ShowCasePrints from '@/components/ShowCasePrints.vue';
// Types
import type { Print } from '@/stores/__types__';

let preview = ref({} as Print);
let randomPrint = ref();

const printsStore = usePrintsStore();
const getPrints = computed(() => {
  return printsStore.getPrints;
})
function removePrint(print: Print) {
  return printsStore.removePrint(print);
}

const orderStore = useOrderStore();

const colors = orderStore.getColors;
let fontColor = ref(colors[0]);
let backgroundColor = ref(colors[1]);

const getProducts = computed(() => {
  return orderStore.getProducts;
})

// colors = [fontColor, backgroundColor]
function addProduct(productPrint: Print, colors: string[]) {
  if (productPrint.verses || productPrint.qoute) {
    orderStore.addProduct(productPrint, colors)
  }
}


const chosenVerseStore = useChosenVerseStore();
function getRandomPoetry(num: number) {
  chosenVerseStore.fetchRandomChosenVerses(num);
  randomPrint.value = chosenVerseStore.getRandomChosenVerses[0];
}

const proseStore = useProseStore();
function getRandomProse(num: number) {
  proseStore.fetchRandomProses(num);
  randomPrint.value = proseStore.getRandomProses[0];
}
</script>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

#printing {
  display: grid;
  grid-template-columns: 75% 25%;
  color: #fff;
  margin-top: 1rem;

  @include mQ($breakpoint-md) {
    grid-template-columns: 70% 30%;
  }

  h3 {
    text-align: center;

    @include mQ($breakpoint-md) {
      font-size: 1.1rem;
    }

    @include mQ($breakpoint-sm) {
      font-size: 1rem;
    }
  }

  .container {
    min-height: 50vh;
  }

  #preview {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 1rem;
    border-radius: 1.5rem;
    background: #1f2124;

    .verse,
    .qoute {
      padding: 0 0.6rem;
      font-size: 1.6rem;
      width: 70%;
      margin: 0 auto;

      @include mQ($breakpoint-md) {
        font-size: 0.9rem;
      }

      @include mQ($breakpoint-sm) {
        font-size: 0.8rem;
      }
    }

    .qoute {
      text-align: center;
    }

    #customization {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 0.3rem;

      .select {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;

        select {
          border: none;
        }

        #fontType {
          margin-top: 0.3rem;
        }
      }

      @include mQ($breakpoint-md) {
        .select {
          padding: 0.3rem;
        }

        label {
          font-size: 0.9rem;
        }
      }

      @include mQ($breakpoint-sm) {
        .select {
          padding: 0.1rem;
        }

        label {
          font-size: 0.6rem;
        }
      }
    }

    button {
      margin: 0.5rem auto;
      @include submit-btn
    }

    #partners-link {
      position: absolute;
      left: 0.8rem;
      top: 0.8rem;
      color: #f6b352;
      border: 2px solid #f6b352;
      background-color: #1f2124;
      padding: 0.5rem;
      border-radius: 1.5rem;
      margin: 0.1rem;
      text-decoration: none;

      &:hover {
        color: #1f2124;
        background: #f6b352;
      }
    }
  }

  #prints {
    $mainColor: rgba($color: #fff, $alpha: .8);
    $secondaryColor: #1f2124;
    /////
    background: $secondaryColor;
    margin-left: 0.5rem;
    border-radius: 1rem;

    #randoms {
      color: $mainColor;
      border: 1px solid $mainColor;
      list-style: none;
      border-radius: 5px;
      padding: 0.5rem;
      margin: 0.5rem;

      .qoute {
        text-align: center;
      }

      #buttons {
        display: flex;
        justify-content: space-around;

        button {
          background: $mainColor;
          color: $secondaryColor;
          padding: 0.4rem;
          border: none;
          border-radius: 0.7rem;
          cursor: pointer;

          @include mQ($breakpoint-md) {
            padding: 0.15rem;
          }

          @include mQ($breakpoint-sm) {
            padding: 0.1rem;
          }
        }
      }
    }
  }
}
</style>