import { defineStore } from 'pinia';
import axios from 'axios';
// types
import type { Poem } from './__types';

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
        alert(error);
        console.log(error);
      }
    },
    async fetchPoemAndSuggestedPoems(id: any) {
      try {
        let apiPoem = `${import.meta.env.VITE_API_URL}/poem/${id}`;
        let reqPoem = await axios.get(apiPoem);
        this.poem = reqPoem.data;

        this.fetchOtherPoems(id);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchOtherPoems(id: any) {
      try {
        let apiPoemsIntros = `${import.meta.env.VITE_API_URL}/poems_intros`;
        let reqPoemsIntros = await axios.get(apiPoemsIntros);

        this.poems = reqPoemsIntros.data;
        let poemIndex = this.poems.map((poem) => poem._id).indexOf(id);
        this.poems.splice(poemIndex, 1);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
});
