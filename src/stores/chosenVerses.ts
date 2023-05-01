import { defineStore } from 'pinia';
import axios from 'axios';
// types
import type { ChosenVerse } from './__types';

export const useChosenVerseStore = defineStore('chosenVerses', {
  state: () => ({
    chosenVerses: [] as ChosenVerse[],
    randomChosenVerses: [] as ChosenVerse[],
  }),
  getters: {
    getChosenVerses(state): ChosenVerse[] {
      return state.chosenVerses;
    },
    getRandomChosenVerses(state): ChosenVerse[] {
      return state.randomChosenVerses;
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
    async fetchRandomChosenVerses(num: number) {
      try {
        const req = await axios.get(
          `${import.meta.env.VITE_API_URL}/chosenverses/random?num=${num}`
        );
        this.randomChosenVerses = req.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});
