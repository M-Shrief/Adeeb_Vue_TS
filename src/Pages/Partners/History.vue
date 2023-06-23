<template>
  <section id="history">
    <h3>تاريخ طلبات الاستاذ {{ (partner as Partner).name }}</h3>
    <div v-if="getOrders" v-for="order in getOrders" :key="order._id"
      class="order">
      <div class="order-details">
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
        <div v-for="productGroup, index in order.products as ProductGroup[]"
          :key="index">
          <div class="group-details"
            :style="{ color: productGroup.fontColor, background: productGroup.backgroundColor }">
            <p>نوع الخط: {{ productGroup.fontType }} </p>
            <p v-if="productGroup.prints">{{ productGroup.prints.length }}
              طبعات</p>
          </div>
          <div class="group-prints">
            <div v-for="print in productGroup.prints" :key="print._id"
              class="group-print"
              :style="{ color: productGroup.fontColor, background: productGroup.backgroundColor }">
              <p v-if="print.verses"> {{ print.verses[0].first }}...</p>
              <p v-else-if="print.qoute"> {{ print.qoute.slice(0, 30) }}...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// Only show for authenticated Partners
import { onMounted, computed } from 'vue';
// Stores
import { useOrderStore } from "@/stores/orders";
import { usePartnerStore } from '@/stores/partners';
// types
import type { Partner, ProductGroup } from '@/stores/__types__'

const partnerStore = usePartnerStore();
const partner = computed(() => {
  return partnerStore.getPartner;
});

const orderStore = useOrderStore();
const getOrders = computed(() => {
  return orderStore.getOrders;
});

onMounted(() => {
  let id = (partner.value as Partner)._id;
  orderStore.fetchPartnerOrders(id);
})

</script>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

$mainColor: #e0f2e9;
$secondaryColor: #1f2124;


h3 {
  text-align: center;
  font-size: 2rem;
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

    .group-details,
    .group-print {
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
        font-weight: 600;
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

    .group-prints {
      font-size: 0.8rem;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>