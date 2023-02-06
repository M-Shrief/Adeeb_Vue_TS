import { defineStore } from 'pinia';
import axios from 'axios';
import type { Poet } from './__types';

export const usePoetStore = defineStore('poets', {
  state: () => {
    return {
      // for initially empty lists
      poets: [] as Poet[],
      // for data that is not yet loaded
      poet: null as Poet | null,
    };
  },
  getters: {
    getPoets(state): Poet[] {
      return state.poets;
    },
    getPoet(state): Poet | null {
      return state.poet;
    },
  },
  actions: {
    async fetchPoets() {
      try {
        const req = await axios.get(`${import.meta.env.VITE_API_URL}/poets`);
        this.poets = req.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    // async fetchPoet(id) {
    //   try {
    //     const apiUrl = `${import.meta.env.VITE_API_URL}/poet/${id}`;
    //     const req = await axios.get(apiUrl);
    //     this.poet = req.data;
    //   } catch (error) {
    //     alert(error);
    //     console.log(error);
    //   }
    // },
  },
});
