import {ref, computed} from 'vue';
import { defineStore } from 'pinia';
import axios, { AxiosError } from 'axios';
// Stores
import { useOrderStore } from './orders';
// types
import type { Partner } from './__types__';

// Composables
import { useAxiosError } from '../composables/error';
import { useSessionStorage } from '@vueuse/core';

export const usePartnerStore = defineStore('partners', () => {
    const partner =  ref(useSessionStorage< string | null>('partner', null as string | null));
    const getPartner =  computed<Partner | null>(() => {
      if(typeof partner?.value == 'string') return JSON.parse(partner.value);
      return null
    });
    
    const isPartner = computed<boolean>(() => {
      return partner.value ? true : false;
    }); 

    async function signup(partnerData: Partner) {
      try {
        let api = `${import.meta.env.VITE_API_URL}/partner/signup`;

        const req = await axios.post(api, partnerData);
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + req.data.accessToken;
        partner.value = req.data.partner;
      } catch (error) {
        if (error instanceof AxiosError) {
          useAxiosError(error);
          return;
        }
        alert(error);
      }
    };
    
    async function login(partnerData: Partner) {
      try {
        let api = `${import.meta.env.VITE_API_URL}/partner/login`;
        const req = await axios.post(api, partnerData);
        partner.value = JSON.stringify(req.data.partner);
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + req.data.accessToken;
      } catch (error) {
        if (error instanceof AxiosError) {
          useAxiosError(error);
          return;
        }
        alert(error);
      }
    };
    
    async function logout() {
      const orderStore = useOrderStore();
      orderStore.reset();
      axios.defaults.headers.common['Authorization'] = undefined;
      partner.value = null;
      axios.defaults.withCredentials = false;
    };

    return {getPartner, isPartner, signup, login, logout}
});
