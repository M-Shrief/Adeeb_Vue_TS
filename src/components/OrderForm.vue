<template>
  <form @submit.prevent="confirmOrder" dir="rtl">
    <div id="confirmation">
      <div id="customer-details" v-if="partner">
        <div class="container">
          <p>الاسم: {{ partner.name }}</p>
        </div>
        <div class="container">
          <p>الهاتف: {{ partner.phone }}</p>
        </div>
        <div class="container">
          <label for="address">العنوان: </label>
          <select name="address" id="address">
            <option v-if="typeof partner.address == 'string'"
              :value="partner.address">{{ partner.address }}</option>
            <option v-else v-for="address in partner.address" :value="address"
              :key="address">
              {{ address }}
            </option>
          </select>
        </div>
      </div>
      <div id="customer-details" v-else>
        <div class="container">
          <label for="name">الاسم: </label>
          <input type="text" id="name" name="name" required minlength="5"
            maxlength="20" />
        </div>
        <div class="container">
          <label for="phone">الهاتف: </label>
          <input type="text" id="phone" name="phone" required minlength="8"
            maxlength="18" />
        </div>
        <div class="container">
          <label for="address">العنوان: </label>
          <input type="text" id="address" name="address" required minlength="8"
            maxlength="70" />
        </div>
      </div>

      <div id="products">
        <div v-for="product in products" class="product-details"
          :key="product.print._id"
          :style="{ color: product.fontColor, background: product.backgroundColor }"
          @dblclick="deleteProduct(products as Product[], product)">
          <p>{{ product.fontType }}</p>
          <p v-if="product.print.verses"> {{ product.print.verses[0].first
          }}...</p>
          <p v-else-if="product.print.qoute">
            {{ product.print.qoute.slice(0, 30) }}...</p>
        </div>
        <div v-for="productGroup, index in productGroups" :key="index">
          <div class="group-details"
            :style="{ color: productGroup.fontColor, background: productGroup.backgroundColor }">
            <p>نوع الخط: {{ productGroup.fontType }} </p>
            <p>{{ productGroup.prints.length }} طبعات</p>
          </div>
          <div class="group-prints">
            <div v-for="print in productGroup.prints" :key="print._id"
              class="group-print"
              :style="{ color: productGroup.fontColor, background: productGroup.backgroundColor }"
              @dblclick="deleteFromProductGroup(productGroup, print)">
              <p v-if="print.verses"> {{ print.verses[0].first }}...</p>
              <p v-else-if="print.qoute"> {{ print.qoute.slice(0, 30) }}...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button type="submit">تأكيد الطلب</button>
  </form>
</template>

<script lang="ts" setup>
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';
// stores
import { useOrderStore } from '@/stores/orders';
import { usePartnerStore } from '@/stores/partners';
// types
import type { Product, Order, Print, ProductGroup, Partner } from '@/stores/__types';

const router = useRouter();

const props = defineProps({
  products: {
    type: Array<Product>,
    required: false
  },
  productGroups: {
    type: Array<ProductGroup>,
    required: false,
    default: []
  },
});

function deleteProduct(products: Product[], product: Product) {
  let productIndex = products.map(product => product.print._id).indexOf(product.print._id);
  products.splice(productIndex, 1);
}

function deletePrint(productGroup: ProductGroup, print: Print) {
  let printIndex = productGroup.prints.map(print => print._id).indexOf(print._id);
  productGroup.prints.splice(printIndex, 1);
}

// ProductGroup
function deleteFromProductGroup(productGroup: ProductGroup, print: Print) {
  if (productGroup.prints.length == 1) {
    let productGroupIndex = props.productGroups.map(productGroup => productGroup.prints.length).indexOf(1);
    props.productGroups.splice(productGroupIndex, 1);
  } else {
    deletePrint(productGroup, print)
  }
}

// check this https://stackoverflow.com/questions/12989741/the-property-value-does-not-exist-on-value-of-type-htmlelement
const orderStore = useOrderStore();
const partnerStore = usePartnerStore();
const partner = computed(() => {
  return partnerStore.getPartner;
});

async function confirmOrder() {
  let name, phone, address, order;
  if (partner.value) {
    name = partner.value.name
    phone = partner.value.phone
    address = (document.getElementById("address") as HTMLInputElement).value;

    order = {
      partner: partner.value._id,
      name,
      phone,
      address,
      products: props.productGroups
    } as Order;
    await orderStore.newOrder(order)
    orderStore.reset()
    router.push('/partners/history');
  } else {
    name = (document.getElementById("name") as HTMLInputElement).value;
    phone = (document.getElementById("phone") as HTMLInputElement).value;
    address = (document.getElementById("address") as HTMLInputElement).value;

    order = {
      name,
      phone,
      address,
      products: props.products
    } as Order;
    await orderStore.newOrder(order)
    orderStore.reset()
    router.push('/history');
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

$mainColor: #e0f2e9;
$secondaryColor: #1f2124;

form {
  background-color: $secondaryColor;
  margin: 1rem;
  border-radius: 1.5rem;
  padding: 0.5rem;

  #customer-details {
    color: $mainColor;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    .container {
      font-size: 1.1rem;
      padding: 0.8rem;
      margin-right: 0.2rem;
      margin-top: 0.4rem;

      input[type='text'] {
        background: rgba($color: $mainColor, $alpha: 1);
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 1rem;

      }

      select {
        background-color: $mainColor;
        border: 1px solid $secondaryColor;
      }
    }

    @include mQ($breakpoint-sm) {
      padding: 0.1rem;
      margin-top: 0.1rem;

      input[type='text'] {
        font-size: 0.8rem;
      }
    }

    @include mQ($breakpoint-md) {
      padding: 0.3rem;
      margin-top: 0.3rem;

      input[type='text'] {
        font-size: 0.7rem;
      }
    }
  }

  #products {
    font-weight: 550;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-around;

    .product-details,
    .group-details,
    .group-print {
      position: relative;
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      padding: 0.2rem;
      margin: 0.3rem .5rem;
      border-radius: 1.5rem;
      border: 1px solid #fff;

      p {
        margin: 0 0.6rem;
      }

      @include mQ($breakpoint-md) {
        padding: 0.15rem;
        margin: 0.15rem;

        p {
          font-size: 0.8rem;
        }
      }

      @include mQ($breakpoint-sm) {
        padding: 0.1rem;
        margin: 0.1rem;

        p {
          font-size: 0.7rem;
        }
      }
    }

    .product-details,
    .group-print {
      cursor: pointer;

    }

    .group-prints {
      font-size: 0.75rem;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }

  button[type='submit'] {
    position: relative;
    right: 45%;
    margin: 0.5rem auto;
    @include submit-btn
  }
}
</style>