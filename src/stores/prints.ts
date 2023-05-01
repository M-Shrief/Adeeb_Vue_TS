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
      if (!this.getPrints.includes(print)) {
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
