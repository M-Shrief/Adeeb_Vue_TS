import {shallowRef, computed} from 'vue';
import { defineStore } from 'pinia';
// Utils
import { apiURL } from '@/utils/fetch';
// types
import type { Poem } from './__types__';
// Composables
import { useFetchError } from '../composables/error';

export const usePoemStore = defineStore('poems', () => {
  const poems = shallowRef<Poem[]>([]);
  const getPoems = computed<Poem[]>(() => poems.value);


  async function fetchPoems() {
    const res = await fetch(
      apiURL('/poems_intros'),
      {
        method: "GET"
      }
    )

    if(res.ok) {
      poems.value = await res.json()
    } else {
      useFetchError(await res.json())
    }
  };

  const poem = shallowRef<Poem | null>(null);
  const getPoem = computed<Poem | null>(() => poem.value);

  const otherPoems = shallowRef<Poem[]>([]);
  const getOtherPoems = computed<Poem[]>(() => { return otherPoems.value});
  async function fetchOtherPoems(id: string) {
    if(getPoems.value.length === 0) await fetchPoems();
    const poemsArr = [...getPoems.value];
    let poemIndex = poemsArr.map((poem: Poem) => poem._id).indexOf(id);
    poemsArr.splice(poemIndex, 1);
    otherPoems.value = poemsArr;
  };
    
  async function fetchPoemAndSuggestedPoems(id: string) {
    const res = await fetch(
      apiURL(`/poem/${id}`)
    )

    if(res.ok) {
      poem.value = await res.json()
      fetchOtherPoems(id);
    } else {
      useFetchError(await res.json())
    }
  };

  return {getPoems, getPoem, getOtherPoems, fetchPoems, fetchOtherPoems, fetchPoemAndSuggestedPoems}
});
