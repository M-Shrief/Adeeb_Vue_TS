import { defineStore } from 'pinia';
import axios from 'axios';

export interface PoemInfo {
  _id: string;
  intro: string;
  poet: string | object;
  verses: [
    {
      first: string;
      sec: string;
      _id: string;
    }
  ];
  reviewed: boolean;
}

export const usePoemStore = defineStore('poems', {
  state: () => {
    return {
      // for initially empty lists
      poems: [] as PoemInfo[],
      // for data that is not yet loaded
      poem: null as PoemInfo | null,
    };
  },
  getters: {
    getPoems(state): PoemInfo[] {
      return state.poems;
    },
    getPoem(state): PoemInfo | null {
      return state.poem;
    },
  },
  actions: {
    async fetchPoems() {
      try {
        const req = await axios.get(`http://localhost:3000/api/poems_intros`);
        this.poems = req.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    // async fetchPoemAndOtherPoems(id) {
    //   try {
    //     let apiPoem = `${import.meta.env.VITE_API_URL}/poem/${id}`;
    //     let reqPoem = await axios.get(apiPoem);
    //     this.poem = reqPoem.data;

    //     this.fetchOtherPoems(id);
    //   } catch (error) {
    //     alert(error);
    //     console.log(error);
    //   }
    // },
    // async fetchOtherPoems(id) {
    //   try {
    //     let apiPoemsIntros = `${import.meta.env.VITE_API_URL}/poems_intros`;
    //     let reqPoemsIntros = await axios.get(apiPoemsIntros);

    //     this.poems = reqPoemsIntros.data;
    //     let poemIndex = this.poems.map((poem) => poem._id).indexOf(id);
    //     this.poems.splice(poemIndex, 1);
    //   } catch (error) {
    //     alert(error);
    //     console.log(error);
    //   }
    // },
  },
});
