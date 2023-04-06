import { defineStore } from 'pinia';
import axios from 'axios';
// types
import type { Partner } from './__types';

export const usePartnerStore = defineStore('partners', {
  state: () => ({
    partner: null as Partner | null,
  }),
  persist: {
    storage: sessionStorage,
  },
  getters: {
    getPartner(state): Partner | null {
      return state.partner;
    },
  },
  actions: {
    async signup(partner: Partner) {
      try {
        let api = `${import.meta.env.VITE_API_URL}/partner/signup`;
        const req = await axios.post(api, partner);
        this.fetchPartner(req.data._id);
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + req.data.accessToken;
      } catch (error) {
        alert(error);
      }
    },
    async login(partner: Partner) {
      try {
        let api = `${import.meta.env.VITE_API_URL}/partner/login`;
        const req = await axios.post(api, partner);
        this.fetchPartner(req.data._id);
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + req.data.accessToken;
        axios.defaults.withCredentials = true;
      } catch (error) {
        alert(error);
      }
    },
    async fetchPartner(id: string) {
      let api = `${import.meta.env.VITE_API_URL}/partner/${id}`;
      const req = await axios.get(api);

      this.partner = req.data;
    },
    async logout() {
      // let api = `${import.meta.env.VITE_API_URL}/partner/logout`;
      // await axios
      //   .post(api)
      //   .then(() => {})
      //   .catch((err) => console.error(err));
      this.partner = null;
      axios.defaults.withCredentials = false;
    },
  },
});
