import {ref, computed} from 'vue';
import { defineStore } from 'pinia';
// Stores
import { useChosenVerseStore } from './chosenVerses';
import { useProseStore } from './proses';
// types
import type { Poetry } from './__types__';
// Utils
import {shuffle} from '../utils/shuffle'

export const usePoetryStore = defineStore('poetry', () => {
    const poetry = ref<Poetry[]>([]);
    const getPoetry = computed(() => {
        return poetry.value;
    })
    
    const chosenVersesStore = useChosenVerseStore();
    const prosesStore = useProseStore();

    async function fetchPoetry() {
        if(poetry.value.length != 0) return

        await Promise.allSettled([
            await chosenVersesStore.fetchChosenVerses(),
            await prosesStore.fetchProses(),
        ]);
        
        poetry.value = [...chosenVersesStore.getChosenVerses, ...prosesStore.getProses] as Poetry[];
        await shuffle(poetry.value);
    }

    return {getPoetry, fetchPoetry};
})
