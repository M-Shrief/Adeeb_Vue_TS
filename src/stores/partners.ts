import {ref, computed} from 'vue';
import { defineStore } from 'pinia';
// Utils
import {ContentType, apiURL} from '../utils/fetch'
// Stores
import { useOrderStore } from './orders';
// types
import type { Partner } from './__types__';

// Composables
import { useFetchError } from '../composables/error';
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
      const res = await fetch(
        apiURL(`/partner/signup`), 
        {
          method: "POST",
          headers: {
            'Content-Type': ContentType.JSON, 
          },
          body: JSON.stringify(partnerData)
        }
      )
      if(res.ok) {
        const data = await res.json()
        partner.value = JSON.stringify(data.partner)
        sessionStorage.setItem("accessToken", data.accessToken);
      } else {
        useFetchError(await res.json())
      }
    };
    
    async function login(partnerData: Partner) {
      const res = await fetch(
        apiURL(`/partner/login`), 
        {
          method: "POST",
          headers: {
            'Content-Type': ContentType.JSON, 
          },
          body: JSON.stringify(partnerData)
        }
      )
      if(res.ok) {
        const data = await res.json()
        partner.value = JSON.stringify(data.partner)
        sessionStorage.setItem("accessToken", data.accessToken);
      } else {
        useFetchError(await res.json())
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
