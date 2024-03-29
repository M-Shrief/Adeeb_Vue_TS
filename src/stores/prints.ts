import {ref, computed} from 'vue';
import { defineStore } from 'pinia';
// Types
import type { Print, ChosenVerse, Prose } from './__types__';
// Composables
import {useSessionStorage} from '@vueuse/core';


export const usePrintsStore = defineStore('prints', () => {
  const prints =  ref(useSessionStorage('prints', [] as Print[]));
  const getPrints =  computed<Print[]>(() => {
    return prints.value;
  });
  function addPrint(print: Print) {
    const printsIds = prints.value.map((printItem) => printItem._id);
    if (!printsIds.includes(print._id)) {
      prints.value.push(print);
    }
  };
  function prepPrints(printsData: ChosenVerse[] | Prose[]) {
    // it's normal in big orders to repeat the same print
    prints.value = prints.value.concat(printsData as Print[]);
  };
  function removePrint(print: Print) {
    let printIndex = prints.value
      .map((verse) => verse._id)
      .indexOf(print._id);
    prints.value.splice(printIndex, 1);
  };
  function emptyPrints(): void {
    prints.value = []
  }

  return {getPrints, addPrint, prepPrints, removePrint, emptyPrints}
});
