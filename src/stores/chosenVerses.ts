import {ref, computed} from 'vue';
import { defineStore } from 'pinia';
import axios, { AxiosError } from 'axios';
// types
import type { ChosenVerse } from './__types__';
// Composables
import { useAxiosError } from '../composables/error';

export const useChosenVerseStore = defineStore('chosenVerses', () => {
  const chosenVerses =  ref<ChosenVerse[]>([]);
  const getChosenVerses = computed<ChosenVerse[]>(() => chosenVerses.value);
  async function fetchChosenVerses() {
    try {
      const req = await axios.get(
        `${import.meta.env.VITE_API_URL}/chosenverses`
      );
      chosenVerses.value = req.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        useAxiosError(error);
        return;
      }
      alert(error);
    }
  };

  const randomChosenVerses =ref<ChosenVerse[]>([]);
  const getRandomChosenVerses = computed<ChosenVerse[]>(() => randomChosenVerses.value);
  async function fetchRandomChosenVerses(num: number) {
    try {
      const req = await axios.get(
        `${import.meta.env.VITE_API_URL}/chosenverses/random?num=${num}`
      );
      randomChosenVerses.value = req.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        useAxiosError(error);
        return;
      }
      alert(error);
    }
  };

    return {getChosenVerses, fetchChosenVerses, getRandomChosenVerses, fetchRandomChosenVerses}
});
