import { defineStore } from 'pinia';

export interface PrintInfo {
  _id: string;
  peot?: string | object;
  poem?: string | object;
  reviewed: boolean;
  tags?: string;
  verse?: [
    {
      _id: string;
      first: string;
      sec: string;
    }
  ];
  qoute?: string;
  first?: string;
  sec?: string;
}

export const usePrintStore = defineStore('prints', {
  state: () => {
    return {
      // for initially empty lists
      prints: [] as PrintInfo[],
    };
  },
  getters: {
    getPrints(state): PrintInfo[] {
      return state.prints;
    },
  },
  actions: {
    addPrint(print: PrintInfo) {
      if (!this.getPrints.includes(print)) {
        this.prints.push(print);
      }
    },
    removePrint(print: PrintInfo) {
      let printIndex = this.getPrints
        .map((verse) => verse._id)
        .indexOf(print._id);
      this.getPrints.splice(printIndex, 1);
    },
  },
});
