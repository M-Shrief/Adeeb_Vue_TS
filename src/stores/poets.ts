import {shallowRef, computed} from 'vue';
import { defineStore } from 'pinia';
// Utils
import {apiURL} from '../utils/fetch'
// Types
import type { Poet, Poetry } from './__types__';
// Composables
import {useFetchError } from '../composables/error';

export const usePoetStore = defineStore('poets', () => {
 const poets = shallowRef<Poet[]>([])
 const getPoets = computed<Poet[]>(() => poets.value)
 async function fetchPoets() {
  if (poets.value.length != 0) return

  const res = await fetch(
    apiURL(`/poets`), 
    {
      method: "GET"
    }
  )

  if (res.ok) {
    poets.value = await res.json()
  } else {
    useFetchError(await res.json())
  }
};

 const poet = shallowRef<Poet | null>(null)
 const getPoet = computed<Poet | null>(() => poet.value)
 async function fetchPoet(id: string) {
  if(poet.value && poet.value._id == id) return

  const res = await fetch(
    
    apiURL(`/poet/${id}`), 
    {
      method: "GET"
    }
  )

  if (res.ok) {
    poet.value = await res.json()
    if(poet.value) {
    // Combining Poet's poetry and shuffling it.

      const poetry = [
        ...poet.value.chosenVerses,
        ...poet.value.proses,
    ] as Poetry[];
      // await shuffle(poetry);
      poet.value.poetry = poetry;
    }
  } else {
    useFetchError(await res.json())
  }
 };

 return {getPoets, fetchPoets, getPoet, fetchPoet}
});