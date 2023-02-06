import { defineStore } from 'pinia';
import axios from 'axios';

export interface ChosenVerseInfo {
  _id: string;
  poet: string | object;
  poem: string | object;
  tags: string;
  verse: [
    {
      first: string;
      sec: string;
      _id: string;
    }
  ];
  reviewed: boolean;
}

export const useChosenVerseStore = defineStore('chosenVerses', {
  state: () => ({
    chosenVerses: [] as ChosenVerseInfo[],
  }),
  getters: {
    getChosenVerses(state): ChosenVerseInfo[] {
      return state.chosenVerses;
    },
  },
  actions: {
    async fetchChosenVerses() {
      try {
        const req = await axios.get(`http://localhost:3000/api/chosenverses`);
        this.chosenVerses = req.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    // async fetchRandomChosenVerses(num) {
    //   try {
    //     const req = await axios.get(
    //       `${import.meta.env.VITE_API_URL}/chosenverses_random/${num}`
    //     );
    //     this.chosenVerses = req.data;
    //   } catch (error) {
    //     alert(error);
    //     console.log(error);
    //   }
    // },
  },
});
