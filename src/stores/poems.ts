import {shallowRef, computed} from 'vue';
import { defineStore } from 'pinia';
import { AxiosError } from 'axios';
import {baseHttp} from '../utils/axios'
// types
import type { Poem } from './__types__';
// Composables
import { useAxiosError } from '../composables/error';

export const usePoemStore = defineStore('poems', () => {
  const poems = shallowRef<Poem[]>([]);
  const getPoems = computed<Poem[]>(() => poems.value);


  async function fetchPoems() {
    try {
      const req = await baseHttp.get(
        `/poems_intros`
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

  const poem = shallowRef<Poem | null>(null);
  const getPoem = computed<Poem | null>(() => poem.value);

  const otherPoems = shallowRef<Poem[]>([]);
  const getOtherPoems = computed<Poem[]>(() => { return otherPoems.value});
  async function fetchOtherPoems(id: string) {
    try {
      if(getPoems.value.length === 0) await fetchPoems();
      const poemsArr = [...getPoems.value];
      let poemIndex = poemsArr.map((poem: Poem) => poem._id).indexOf(id);
      poemsArr.splice(poemIndex, 1);
      otherPoems.value = poemsArr;
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
      let reqPoem = await baseHttp.get(`/poem/${id}`);
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

  return {getPoems, getPoem, getOtherPoems, fetchPoems, fetchOtherPoems, fetchPoemAndSuggestedPoems}
});
