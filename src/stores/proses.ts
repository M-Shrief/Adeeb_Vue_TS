import {ref, computed} from 'vue';
import { defineStore } from 'pinia';
import axios, { AxiosError } from 'axios';
// types
import type { Prose } from './__types__';
// Composables
import { useAxiosError } from '../composables/error';

export const useProseStore = defineStore('proses', () => {
  const proses = ref<Prose[]>([]);
  const getProses = computed<Prose[]>(() => proses.value);
  async function fetchProses() {
    try {
      const req = await axios.get(`${import.meta.env.VITE_API_URL}/proses`);
      proses.value = req.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        useAxiosError(error);
        return;
      }
      alert(error);
    }
  };

  const randomProses = ref<Prose[]>([]);
  const getRandomProses = computed<Prose[]>(() => randomProses.value);
  async function fetchRandomProses(num: number) {
    try {
      const req = await axios.get(
        `${import.meta.env.VITE_API_URL}/proses/random?num=${num}`
      );
      randomProses.value = req.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        useAxiosError(error);
        return;
      }
      alert(error);
    }
  };

  return {getProses, fetchProses,  getRandomProses, fetchRandomProses};
});