import {shallowRef, computed} from 'vue';
import { defineStore } from 'pinia';
// Utils
import {apiURL} from '../utils/fetch'
// types
import type { ChosenVerse } from './__types__';
// Composables
import { useFetchError } from '../composables/error';

export const useChosenVerseStore = defineStore('chosenVerses', () => {
  const chosenVerses =  shallowRef<ChosenVerse[]>([]);
  const getChosenVerses = computed<ChosenVerse[]>(() => chosenVerses.value);
  async function fetchChosenVerses() {
    const res = await fetch(
      apiURL(`/chosenverses`)
    )
    if(res.ok) {
      chosenVerses.value = await res.json()
    } else {
      useFetchError(await res.json())
    }
  };

  const randomChosenVerses =shallowRef<ChosenVerse[]>([]);
  const getRandomChosenVerses = computed<ChosenVerse[]>(() => randomChosenVerses.value);
  async function fetchRandomChosenVerses(num: number) {
      const res = await fetch(
        apiURL(`/chosenverses/random?num=${num}`)
      )
      if(res.ok) {
        randomChosenVerses.value = await res.json()
      } else {
        useFetchError(await res.json())
      }
  };

    return {getChosenVerses, fetchChosenVerses, getRandomChosenVerses, fetchRandomChosenVerses}
});
