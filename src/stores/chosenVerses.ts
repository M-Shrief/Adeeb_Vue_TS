import { defineStore } from 'pinia';
import axios, { AxiosError } from 'axios';
// types
import type { ChosenVerse } from './__types__';
// Composables
import { useAxiosError } from '../composables/error';
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
        if (error instanceof AxiosError) {
          useAxiosError(error);
          return;
        }
        alert(error);
      }
    },
    async fetchRandomChosenVerses(num: number) {
      try {
        const req = await axios.get(
          `${import.meta.env.VITE_API_URL}/chosenverses/random?num=${num}`
        );
        this.randomChosenVerses = req.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          useAxiosError(error);
          return;
        }
        alert(error);
      }
    },
  },
});
