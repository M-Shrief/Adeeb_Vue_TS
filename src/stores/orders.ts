import { defineStore } from 'pinia';
import axios from 'axios';
// types
import type { Order, Product, ProductGroup, Print } from './__types__';

export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: [] as Order[],
    productGroups: [] as ProductGroup[],
    products: [] as Product[],
    colors: [
      '#fff',
      '#000',
      '#2c3e50',
      '#c80815',
      '#42b983',
      '#dc5318',
      'silver',
      '#f6b352',
    ],
  }),
  persist: {
    storage: sessionStorage,
  },
  getters: {
    getOrders(state): Order[] {
      return state.orders;
    },
    getProducts(state): Product[] {
      return state.products;
    },
    getProductGroup(state): ProductGroup[] {
      return state.productGroups;
    },
    getColors(state): string[] {
      return state.colors;
    },
  },
  actions: {
    async fetchOrders(name: string, phone: string) {
      try {
        const req = await axios.post(
          `${import.meta.env.VITE_API_URL}/orders/guest`,
          { name, phone }
        );
        this.orders = req.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchPartnerOrders(partner: string) {
      try {
        const req = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/${partner}`
        );
        this.orders = req.data;
      } catch (error) {
        alert(error);
      }
    },
    newOrder(order: Order) {
      try {
        let apiOrder = `${import.meta.env.VITE_API_URL}/order`;
        axios.post(apiOrder, order);
      } catch (error) {
        alert(error);
      }
    },
    addProduct(print: Print, colors: string[]) {
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
      this.products.push(product as Product);
    },
    addProductGroup(printsGroup: Print[], colors: string[]) {
      let fontType = (document.getElementById('fontType') as HTMLInputElement)
        .value;

      let productGroup = {
        prints: printsGroup,
        fontType,
        fontColor: colors[0],
        backgroundColor: colors[1],
      };
      this.productGroups.push(productGroup as ProductGroup);
    },
    reset() {
      this.orders = [];
      this.productGroups = [];
      this.products = [];
    },
  },
});
