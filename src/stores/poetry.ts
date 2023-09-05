import {ref, computed} from 'vue';
import { defineStore } from 'pinia';
import  { AxiosError } from 'axios';
import {baseHttp} from '../utils/axios'
// Stores
import { useChosenVerseStore } from './chosenVerses';
import { useProseStore } from './proses';
// types
import type { Poetry } from './__types__';
// Utils
import {shufflePoetry} from '../utils/shuffle'
// Composables
import { useAxiosError } from '../composables/error';

export const usePoetryStore = defineStore('poetry', () => {
    const poetry = ref<Poetry[]>([]);
    const getPoetry = computed(() => {
        return poetry.value;
    })
    
    const chosenVersesStore = useChosenVerseStore();
    const prosesStore = useProseStore();
    async function fetchPoetry() {
        try {
            await Promise.allSettled([
                await chosenVersesStore.fetchChosenVerses(),
                await prosesStore.fetchProses(),
            ]);
    
            poetry.value = [...chosenVersesStore.getChosenVerses, ...prosesStore.getProses] as Poetry[];
            await Promise.all([shufflePoetry(poetry.value)]);
        } catch (error) {
            if (error instanceof AxiosError) {
                useAxiosError(error);
                return;
            }
            alert(error);
        }
    }

    const poetPoetry = ref<Poetry[]>([]);
    const getPoetPoetry = computed(() => {
        return poetPoetry.value;
    })

    return {getPoetry, fetchPoetry};
})
