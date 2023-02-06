import { defineStore } from 'pinia';
import axios from 'axios';
// types
import type { ChosenVerse } from './__types';

export const useChosenVerseStore = defineStore('chosenVerses', {
  state: () => ({
    chosenVerses: [] as ChosenVerse[],
  }),
  getters: {
    getChosenVerses(state): ChosenVerse[] {
      return state.chosenVerses;
    },
  },
  actions: {
    async fetchChosenVerses() {
      try {
        const req = await axios.get(
          `${import.meta.env.VITE_API_URL}/chosenverses`
        );
        this.chosenVerses = req.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    // async fetchRandomChosenVerses(num) {
    //   try {
    //     const req = await axios.get(
    //       `${import.meta.env.VITE_API_URL}/chosenverses_random/${num}`
    //     );
    //     this.chosenVerses = req.data;
    //   } catch (error) {
    //     alert(error);
    //     console.log(error);
    //   }
    // },
  },
});
