import {ref, computed} from 'vue';
import { defineStore } from 'pinia';
import axios, { AxiosError } from 'axios';
// types
import type { Poem } from './__types__';
// Composables
import { useAxiosError } from '../composables/error';

export const usePoemStore = defineStore('poems', () => {
  const poems = ref<Poem[]>([]);
  const getPoems = computed<Poem[]>(() => poems.value);


  async function fetchPoems() {
    try {
      const req = await axios.get(
        `${import.meta.env.VITE_API_URL}/poems_intros`
      );
      poems.value = req.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        useAxiosError(error);
        return;
      }
      alert(error);
    }
  };

  const poem = ref<Poem>({});
  const getPoem = computed<Poem>(() => poem.value);
  async function fetchOtherPoems(id: string) {
    try {
      let apiPoemsIntros = `${import.meta.env.VITE_API_URL}/poems_intros`;
      let reqPoemsIntros = await axios.get(apiPoemsIntros);

      let poemIndex = reqPoemsIntros.data
        .map((poem: Poem) => poem._id)
        .indexOf(id);
      reqPoemsIntros.data.splice(poemIndex, 1);
      poems.value = reqPoemsIntros.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        useAxiosError(error);
        return;
      }
      alert(error);
    }
  };
    
  async function fetchPoemAndSuggestedPoems(id: string) {
    try {
      let apiPoem = `${import.meta.env.VITE_API_URL}/poem/${id}`;
      let reqPoem = await axios.get(apiPoem);
      poem.value = reqPoem.data;

      fetchOtherPoems(id);
    } catch (error) {
      if (error instanceof AxiosError) {
        useAxiosError(error);
        return;
      }
      alert(error);
    }
  };

  return {getPoems, getPoem, fetchPoems, fetchOtherPoems, fetchPoemAndSuggestedPoems}
});
