<template>
  <h3>يَسعد المتنبي بتقديم الخدمات للشركات والتجار والعملاء المميزين.</h3>
  <section id="register">

    <AuthForm />
    <aside>
      <!-- need something simple like: islamic arts, a transition for list-items and on. -->
      <h3>سجل الان للاستفادة من جميع الخدمات المُقدمة من المتنبي</h3>
      <ul>
        <li>سهولة إعداد الطلبات وتعديلها</li>
        <li>متابعة الطلبات فى جميع مراحل تنفيذها</li>
        <li>مراجعة جميع الطلبات السابقة بتفاصيلها</li>
        <li>امكانية اعداد طلبات مختلفة؛ بمواقيت مختلفة، وتوصيلها لأماكن مختلفة.
        </li>
      </ul>
    </aside>
  </section>
  <router-link :to="'partners/ordering'" class="direct-Order">للطلب بدون
    تسجيل</router-link>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
// Components
import AuthForm from '@/components/AuthForm.vue';
// stores
import { usePartnerStore } from '@/stores/partners';

const router = useRouter();
const partnerStore = usePartnerStore();

onBeforeMount(() => {
  if (partnerStore.getPartner) {
    router.push('/partners/ordering')
  }
})

</script>


<style lang="scss" scoped>
@import '@/assets/mixins.scss';

h3 {
  text-align: center;
  font-size: 2rem;
}

#register {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  align-items: center;
}

aside {
  h3 {
    font-size: 1.6rem;
  }
}

.direct-Order {
  position: relative;
  right: 45%;
  text-decoration: none;
  padding: 0.3rem 0.5rem;
  margin: 0.4rem;
  color: rgba($color: #FBE6C2, $alpha: 0.8);
  background-color: #1f2124;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: 1rem;

  &:hover {
    color: #FBE6C2;
  }

  @include mQ($breakpoint-sm) {
    font-size: 0.8rem;
    padding: 0.1rem 0.2rem;
    margin: 0.1rem;
  }
}
</style>