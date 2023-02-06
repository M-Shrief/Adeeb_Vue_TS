import { defineStore } from 'pinia';
import axios from 'axios';
// types
import type { Prose } from './__types';

export const useProseStore = defineStore('proses', {
  state: () => ({
    proses: [] as Prose[],
  }),
  getters: {
    getProses(state): Prose[] {
      return state.proses;
    },
  },
  actions: {
    async fetchProses() {
      try {
        const req = await axios.get(`${import.meta.env.VITE_API_URL}/proses`);
        this.proses = req.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    // async fetchRandomProses(num) {
    //   try {
    //     const req = await axios.get(
    //       `${import.meta.env.VITE_API_URL}/proses_random/${num}`
    //     );
    //     this.proses = req.data;
    //   } catch (error) {
    //     alert(error);
    //     console.log(error);
    //   }
    // },
  },
});
