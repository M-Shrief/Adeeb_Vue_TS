import { defineStore } from 'pinia';
import type { Print } from './__types';

export const usePrintStore = defineStore('prints', {
  state: () => {
    return {
      // for initially empty lists
      prints: [] as Print[],
    };
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
    removePrint(print: Print) {
      let printIndex = this.getPrints
        .map((verse) => verse._id)
        .indexOf(print._id);
      this.getPrints.splice(printIndex, 1);
    },
  },
});
