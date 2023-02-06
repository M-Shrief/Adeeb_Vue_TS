import { defineStore } from 'pinia';
import axios from 'axios';

export interface PoetInfo {
  _id: string;
  name: string;
  time_period: string;
  bio: string;
  reviewed: boolean;
}

export const usePoetStore = defineStore('poets', {
  state: () => {
    return {
      // for initially empty lists
      poets: [] as PoetInfo[],
      // for data that is not yet loaded
      poet: null as PoetInfo | null,
    };
  },
  getters: {
    getPoets(state): PoetInfo[] {
      return state.poets;
    },
    getPoet(state): PoetInfo | null {
      return state.poet;
    },
  },
  actions: {
    async fetchPoets() {
      try {
        const req = await axios.get(`http://localhost:3000/api/poets`);
        this.poets = req.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    // async fetchPoet(id) {
    //   try {
    //     const apiUrl = `${import.meta.env.VITE_API_URL}/poet/${id}`;
    //     const req = await axios.get(apiUrl);
    //     this.poet = req.data;
    //   } catch (error) {
    //     alert(error);
    //     console.log(error);
    //   }
    // },
  },
});
