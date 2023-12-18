import {shallowRef, computed} from 'vue';
import { defineStore } from 'pinia';
// Utils
import {apiURL} from '../utils/fetch'
// Types
import type { Poet } from './__types__';
// Composables
import {useFetchError } from '../composables/error';

export const usePoetStore = defineStore('poets', () => {
 const poets = shallowRef<Poet['details'][]>([])
 const getPoets = computed<Poet['details'][]>(() => poets.value)
 async function fetchPoets() {
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
  const res = await fetch(
    apiURL(`/poet/${id}`), 
    {
      method: "GET"
    }
  )

  if (res.ok) {
    poet.value = await res.json()
  } else {
    useFetchError(await res.json())
  }
 };

 return {getPoets, fetchPoets, getPoet, fetchPoet}
});
