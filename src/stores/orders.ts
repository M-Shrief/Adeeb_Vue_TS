import {ref, shallowRef, computed} from 'vue';
import { defineStore } from 'pinia';
// Utils
import { ContentType, apiURL } from '@/utils/fetch';
// types
import type { Order, Product, ProductGroup, Print } from './__types__';
// Composables
import {useSessionStorage} from '@vueuse/core';
import { useFetchError } from '../composables/error';
import { useSuccessNotification } from '../composables/success';

export const useOrderStore = defineStore('orders', 
  () => {
    const orders =  shallowRef<Order[]>([]);
    const getOrders = computed<Order[]>(() => {
      return orders.value;
    });
    async function fetchOrders(name: string, phone: string) {
      const res = await fetch(
        apiURL(`/orders/guest?name=${name}&phone=${phone}`), 
        {
          method: "GET",
        }
      )
      if (res.ok) {
        orders.value = await res.json()
      } else {
        useFetchError(await res.json())
      }
    };
    async function fetchPartnerOrders(partner: string) {
      const res = await fetch(
        apiURL(`/orders/partner`), 
        {
          method: "GET",
          credentials: "same-origin",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
          }
        }
      )
      if (res.ok) {
        orders.value = await res.json()
      } else {
        useFetchError(await res.json())
      }
    };

    async function newGuestOrder(order: Order) {
      const res = await fetch(
        apiURL(`/orders/guest`),
        {
          method: "POST",
          headers: {
            'Content-Type': ContentType.JSON, 
          },
          body: JSON.stringify(order),
          
        }
      )
      if(res.ok) {
        useSuccessNotification('Operation was made successfully');
      } else {
        useFetchError(await res.json())
      }
    };

    async function newPartnerOrder(order: Order) {
      const res = await fetch(
        apiURL(`/orders/partner`),
        {
          method: "POST",
          credentials: "same-origin",
          headers: {
            'Content-Type': ContentType.JSON, 
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
          },
          body: JSON.stringify(order),
          
        }
      )
      if(res.ok) {
        useSuccessNotification('Operation was made successfully');
      } else {
        useFetchError(await res.json())
      }
    };


    const productGroups =  ref(useSessionStorage('productsGroups', [] as ProductGroup[]));
    const getProductGroups = computed<ProductGroup[]>(() => {
      return productGroups.value;
    });
    function addProductGroup(printsGroup: Print[], colors: string[]) {
      let fontType = (document.getElementById('fontType') as HTMLInputElement)
        .value;

      let productGroup = {
        prints: printsGroup,
        fontType,
        fontColor: colors[0],
        backgroundColor: colors[1],
      };
      productGroups.value.push(productGroup as ProductGroup);
    };

    const products = ref(useSessionStorage('products', [] as Product[]));
    const getProducts = computed<Product[]>(() => {
      return products.value;
    });
    function addProduct(print: Print, colors: string[]) {
      let fontType = (document.getElementById('fontType') as HTMLSelectElement)
        .value;
      let product = {
        print: print,
        fontType,
        fontColor: colors[0],
        backgroundColor: colors[1],
      };
      // Note: Don't check on repeated ones
      // it's normal to get different colors for the same print
      products.value.push(product as Product);
    };

    const colors =  [
      '#fff',
      '#000',
      '#2c3e50',
      '#c80815',
      '#42b983',
      '#dc5318',
      'silver',
      '#f6b352',
    ];
    
    function reset() {
      orders.value = [];
      productGroups.value = [];
      products.value = [];
    };

    return { getOrders, fetchOrders, fetchPartnerOrders, newGuestOrder, newPartnerOrder,  getProductGroups, addProductGroup,  getProducts, addProduct, colors, reset}
  },
)
