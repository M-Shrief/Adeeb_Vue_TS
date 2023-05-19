import { defineStore } from 'pinia';
import axios, { AxiosError } from 'axios';
// types
import type { Poem } from './__types__';
// Composables
import { useAxiosError } from '../composables/error';

export const usePoemStore = defineStore('poems', {
  state: () => {
    return {
      poems: [] as Poem[],
      poem: {} as Poem,
    };
  },
  getters: {
    getPoems(state): Poem[] {
      return state.poems;
    },
    getPoem(state): Poem {
      return state.poem;
    },
  },
  actions: {
    async fetchPoems() {
      try {
        const req = await axios.get(
          `${import.meta.env.VITE_API_URL}/poems_intros`
        );
        this.poems = req.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          useAxiosError(error);
          return;
        }
        alert(error);
      }
    },

    async fetchOtherPoems(id: any) {
      try {
        let apiPoemsIntros = `${import.meta.env.VITE_API_URL}/poems_intros`;
        let reqPoemsIntros = await axios.get(apiPoemsIntros);

        let poemIndex = reqPoemsIntros.data
          .map((poem: Poem) => poem._id)
          .indexOf(id);
        reqPoemsIntros.data.splice(poemIndex, 1);
        this.poems = reqPoemsIntros.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          useAxiosError(error);
          return;
        }
        alert(error);
      }
    },

    async fetchPoemAndSuggestedPoems(id: any) {
      try {
        let apiPoem = `${import.meta.env.VITE_API_URL}/poem/${id}`;
        let reqPoem = await axios.get(apiPoem);
        this.poem = reqPoem.data;

        this.fetchOtherPoems(id);
      } catch (error) {
        if (error instanceof AxiosError) {
          useAxiosError(error);
          return;
        }
        alert(error);
      }
    },
  },
});
