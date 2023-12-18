import {shallowRef, computed} from 'vue';
import { defineStore } from 'pinia';
// Stores
import { useChosenVerseStore } from './chosenVerses';
import { useProseStore } from './proses';
// types
import type { Poetry } from './__types__';
// Utils
import {shufflePoetry} from '../utils/shuffle'
// Composables
import { useFetchError } from '../composables/error';

export const usePoetryStore = defineStore('poetry', () => {
    const poetry = shallowRef<Poetry[]>([]);
    const getPoetry = computed(() => {
        return poetry.value;
    })
    
    const chosenVersesStore = useChosenVerseStore();
    const prosesStore = useProseStore();
    async function fetchPoetry() {
            await Promise.allSettled([
                await chosenVersesStore.fetchChosenVerses(),
                await prosesStore.fetchProses(),
            ]);
            
            poetry.value = [...chosenVersesStore.getChosenVerses, ...prosesStore.getProses] as Poetry[];
            await Promise.all([shufflePoetry(poetry.value)]);
    }

    return {getPoetry, fetchPoetry};
})
