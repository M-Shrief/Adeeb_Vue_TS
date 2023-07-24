import {ref, computed} from 'vue';
import { defineStore } from 'pinia';
import  { AxiosError } from 'axios';
import {baseHttp, withAuthHttp} from '../shared/axios'
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
      if(partner && typeof partner.value == 'string') return JSON.parse(partner.value);
      return null
    });
    
    const isPartner = computed<boolean>(() => {
      return partner.value ? true : false;
    }); 

    async function signup(partnerData: Partner) {
      try {
        const req = await baseHttp.post(`/partner/signup`, partnerData);
        partner.value = JSON.stringify(req.data.partner);
        sessionStorage.setItem("accessToken", req.data.accessToken);
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
        const req = await baseHttp.post(`/partner/login`, partnerData);
        partner.value = JSON.stringify(req.data.partner);
        sessionStorage.setItem("accessToken", req.data.accessToken);
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
      sessionStorage.removeItem("accessToken");
      partner.value = null;
    };

    return {getPartner, isPartner, signup, login, logout}
});
