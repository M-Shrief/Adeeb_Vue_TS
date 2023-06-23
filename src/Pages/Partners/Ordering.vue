<template>
  <section id="prep-order">
    <h3>للطلب مباشرة بدون التسجيل</h3>
    <div class="prep-prints">
      <p>إعداد مطبوعات من المختارات النثرية والشعرية</p>
      <div>
        <label for="poetry">شعر: </label>
        <input type="number" name="poetry" id="poetry" value="5" min="1" max="10">
      </div>
      <button type="submit" @click="preparePoetry">إعداد</button>
      <div>
        <label for="prose">نثر: </label>
        <input type="number" name="prose" id="prose" value="5" min="1" max="10">
      </div>
      <button type="submit" @click="prepareProse">إعداد</button>

    </div>
    <PrintCustomization :colors="colors"
      @fontColor="(color: string) => fontColor = color"
      @backgroundColor="(color: string) => backgroundColor = color">
    </PrintCustomization>

    <div class="preview-prints">
      <!-- use src/components/ShowCasePrint instead, only need addition is to make styles conditional-->
      <ShowCasePrints :prints="getPrints"
        :colors="[computed(() => fontColor as string), computed(() => backgroundColor as string)]"
        @remove="(print) => removePrint(print)" />
    </div>
    <button @click="addProductGroup(getPrints, [fontColor, backgroundColor])">
      اضافة الطلبات</button>
  </section>
  <OrderForm :productGroups="productGroups" />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
// components
import PrintCustomization from '@/components/PrintCustomization.vue';
import ShowCasePrints from '@/components/ShowCasePrints.vue';
import OrderForm from '@/components/OrderForm.vue';
// stores
import { useChosenVerseStore } from "@/stores/chosenVerses";
import { useProseStore } from "@/stores/proses";
import { usePrintsStore } from "@/stores/prints";
import { useOrderStore } from "@/stores/orders";
// types
import type { Print } from '@/stores/__types__'
const printStore = usePrintsStore();
const getPrints = computed(() => {
  return printStore.getPrints;
})
function removePrint(print: Print) {
  return printStore.removePrint(print);
}
function prepPrints(prints: Print[]) {
  return printStore.prepPrints(prints)
}

const orderStore = useOrderStore();
const colors = orderStore.colors;
let fontColor = ref(colors[0]);
let backgroundColor = ref(colors[1]);

const productGroups = computed(() => {
  return orderStore.productGroups;
})

function addProductGroup(prints: Print[], colors: string[]) {
  if (prints.length != 0) {
    orderStore.addProductGroup(prints, colors);
  }
  // empty prints store
  printStore.prints = []
}


const chosenVerseStore = useChosenVerseStore();
const proseStore = useProseStore();

async function preparePoetry() {
  const num = (document.getElementById('poetry') as HTMLInputElement).valueAsNumber;
  await chosenVerseStore.fetchRandomChosenVerses(num).then(() => prepPrints(chosenVerseStore.getRandomChosenVerses as Print[]));
}
async function prepareProse() {
  const num = (document.getElementById('prose') as HTMLInputElement).valueAsNumber;
  await proseStore.fetchRandomProses(num).then(() => {
    prepPrints(proseStore.getRandomProses);
  });
}
</script>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

#prep-order {
  $mainColor: #fff;
  $secondaryColor: #1f2124;
  ////////////
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: $mainColor;
  background-color: $secondaryColor;
  padding: 0.3rem;
  margin: 1rem;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  border-radius: 1.5rem;

  @include mQ($breakpoint-lg) {
    padding: 0.3rem;
    margin: 0.6rem 0.4rem 0;
    font-size: 1.3rem;
  }

  @include mQ($breakpoint-md) {
    padding: 0.2rem;
    margin: 0.5rem 0.3rem 0;
    font-size: 1.2rem;
  }

  @include mQ($breakpoint-sm) {
    padding: 0.1rem;
    margin: 0.3rem 0.1rem 0;
    font-size: 1rem;
  }


  h3 {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0.5rem;
  }

  .prep-prints {
    width: 60%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    input {
      outline: 1px solid #e0f2e9;
      border: none;
      background: #e0f2e9;
      color: #1f2124;
      border-radius: 0.2rem;
    }
  }

  // PrintCustomization
  #customization {
    width: 70%;
    margin: 0 auto;
  }

  button {
    @include submit-btn
  }
}


.preview-prints {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
}
</style>