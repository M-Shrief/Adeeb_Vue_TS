<template>
  <main dir="rtl">
    <h2>ادخل بيانات الطلب لمتابعته</h2>

    <form @submit.prevent="fetchOrder">
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

      <button type="submit">تأكـيد</button>
    </form>

    <div v-for="order in getOrders" :key="order._id" class="order">
      <div class="order-details">
        <div>
          <p>الاسم</p><span>{{ order.name }}</span>
        </div>
        <div>
          <p>الهاتف</p><span>{{ order.phone }}</span>
        </div>
        <div>
          <p>العنوان</p><span>{{ order.address }}</span>
        </div>
        <div>
          <p>تاريخ الطلب</p><span>{{ order.createdAt?.slice(0, 10) }}</span>
        </div>
        <p><span>{{ order.reviewed ? 'تمت المراجعة' : 'غير مراجع' }}</span></p>
        <p><span>{{ order.completed ? 'تم التسليم' : 'لم يتم التسليم' }}</span>
        </p>
      </div>
      <div class="order-products">
        <div v-for="product, index in order.products as Product[]" :key="index"
          class="product"
          :style="{ color: product.fontColor, background: product.backgroundColor }">
          <p>نوع الخط: {{ product.fontType }}</p>
          <p v-if="product.print.verses">{{ product.print.verses[0].first }}...
          </p>
          <p v-else-if="product.print.qoute">
            {{ product.print.qoute.slice(0, 30) }}...</p>
        </div>
      </div>
    </div>

  </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
// Stores
import { useOrderStore } from "@/stores/orders";
// Types
import type { Product } from '@/stores/__types__';

const orderStore = useOrderStore();
const getOrders = computed(() => {
  return orderStore.getOrders;
});


function fetchOrder() {
  let name = (document.getElementById("name") as HTMLInputElement).value;
  let phone = (document.getElementById("phone") as HTMLInputElement).value;
  orderStore.fetchOrders(name, phone);
}

</script>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

$mainColor: #e0f2e9;
$secondaryColor: #1f2124;

h2 {
  text-align: center;
}


form {
  color: $mainColor;
  background-color: $secondaryColor;
  margin: 1rem;
  border-radius: 1.5rem;
  padding: 0.5rem;

  select {
    padding: 0.2rem;
    margin-right: 0.5rem;
  }

  .container {
    padding: 0.5rem;
    margin-right: 0.2rem;
    margin-top: 0.4rem;

    input[type='text'] {
      background: rgba($color: $mainColor, $alpha: 1);
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
      border: none;
      border-radius: 8px;
    }
  }

  button {
    position: relative;
    right: 50%;
    @include submit-btn
  }

}

.order {
  color: $mainColor;
  background: $secondaryColor;
  margin: 1rem;
  border-radius: 1.5rem;

  .order-details {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 1rem;

    p {
      margin: 0.5rem;
    }

    span {
      font-weight: 600;
    }
  }

  .order-products {
    padding: 0.4rem 0;

    .product {
      position: relative;
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      padding: 0.2rem;
      margin: 0.3rem 2rem;
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

  }
}
</style>