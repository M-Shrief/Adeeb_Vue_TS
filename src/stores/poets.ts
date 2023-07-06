import {ref, computed} from 'vue';
import { defineStore } from 'pinia';
import axios, { AxiosError } from 'axios';
// Types
import type { Poet } from './__types__';
// Composables
import { useAxiosError } from '../composables/error';

export const usePoetStore = defineStore('poets', () => {
 const poets = ref<Poet['details'][]>([])
 const getPoets = computed<Poet['details'][]>(() => poets.value)
 async function fetchPoets() {
  try {
    const req = await axios.get(`${import.meta.env.VITE_API_URL}/poets`);
    poets.value = req.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      useAxiosError(error);
      return;
    }
    alert(error);
  }
};

 const poet = ref<Poet | null>(null)
 const getPoet = computed<Poet | null>(() => poet.value)
 async function fetchPoet(id: string) {
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}/poet/${id}`;
    const req = await axios.get(apiUrl);
    poet.value = req.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      useAxiosError(error);
      return;
    }
    alert(error);
  }
 };

 return {getPoets, fetchPoets, getPoet, fetchPoet}
});
