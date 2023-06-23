import { defineStore } from 'pinia';
import type { Print } from './__types__';

export const usePrintsStore = defineStore('prints', {
  state: () => {
    return {
      prints: [] as Print[],
    };
  },
  persist: {
    storage: sessionStorage,
  },
  getters: {
    getPrints(state): Print[] {
      return state.prints;
    },
  },
  actions: {
    addPrint(print: Print) {
      const printsIds = this.prints.map(
        (printItem) =>
          // printItem._id ? printItem._id : printItem.verses[0]._id
          printItem._id
      );
      // const printId = print._id ? print._id : print.verses[0]._id;
      if (!printsIds.includes(print._id)) {
        this.prints.push(print);
      }
    },
    prepPrints(prints: Print[]) {
      // it's normal in big orders to repeat the same print
      this.prints = this.prints.concat(prints);
    },
    removePrint(print: Print) {
      let printIndex = this.getPrints
        .map((verse) => verse._id)
        .indexOf(print._id);
      this.getPrints.splice(printIndex, 1);
    },
  },
});
