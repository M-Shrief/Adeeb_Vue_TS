import {shallowRef, computed} from 'vue';
import { defineStore } from 'pinia';
// Utils
import {apiURL} from '../utils/fetch'
// types
import type { Prose } from './__types__';
// Composables
import {  useFetchError } from '../composables/error';

export const useProseStore = defineStore('proses', () => {
  const proses = shallowRef<Prose[]>([]);
  const getProses = computed<Prose[]>(() => proses.value);
  async function fetchProses() {
    if(proses.value.length != 0) return

    const res = await fetch(
      apiURL(`/proses`)
    )
    if(res.ok) {
      proses.value = await res.json()
    } else {
      useFetchError(await res.json())
    }
  };

  const randomProses = shallowRef<Prose[]>([]);
  const getRandomProses = computed<Prose[]>(() => randomProses.value);
  async function fetchRandomProses(num: number) {
    const res = await fetch(
      apiURL(`/proses/random?num=${num}`)
    )
    if(res.ok) {
      randomProses.value = await res.json()
    } else {
      useFetchError(await res.json())
    }
  };

  return {getProses, fetchProses,  getRandomProses, fetchRandomProses};
});