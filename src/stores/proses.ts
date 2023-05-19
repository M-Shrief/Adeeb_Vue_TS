import { defineStore } from 'pinia';
import axios, { AxiosError } from 'axios';
// types
import type { Prose } from './__types__';
// Composables
import { useAxiosError } from '../composables/error';

export const useProseStore = defineStore('proses', {
  state: () => ({
    proses: [] as Prose[],
    randomProses: [] as Prose[],
  }),
  getters: {
    getProses(state): Prose[] {
      return state.proses;
    },
    getRandomProses(state): Prose[] {
      return state.randomProses;
    },
  },
  actions: {
    async fetchProses() {
      try {
        const req = await axios.get(`${import.meta.env.VITE_API_URL}/proses`);
        this.proses = req.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          useAxiosError(error);
          return;
        }
        alert(error);
      }
    },

    async fetchRandomProses(num: number) {
      try {
        const req = await axios.get(
          `${import.meta.env.VITE_API_URL}/proses/random?num=${num}`
        );
        this.randomProses = req.data;
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
