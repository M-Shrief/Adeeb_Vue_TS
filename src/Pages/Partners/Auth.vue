<template>
  <h3>يَسعد المتنبي بتقديم الخدمات للشركات والتجار والعملاء المميزين.</h3>
  <section id="register">

    <AuthForm @login="onLogin" @signup="onSignup"/>
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
import { onBeforeMount, computed } from 'vue';
import { useRouter } from 'vue-router';
// Components
import AuthForm from '@/components/AuthForm.vue';
// stores
import { usePartnerStore } from '@/stores/partners';
// Composables
import { useAxiosError } from '@/composables/error';

const router = useRouter();


const partnerStore = usePartnerStore();
const partner = computed(() => {
  return partnerStore.getPartner;
})


async function onLogin(values: any) {
    await partnerStore.login(values)
      .then(() => {
        if (partner.value) router.push('/');
      })
      .catch(error => useAxiosError(error));
}

async function onSignup(values: any) {
    await partnerStore.signup(values)
      .then(() => {
        if (partner.value) router.push('/');
      })
      .catch(err => alert('Invalid information'));
}

onBeforeMount(() => {
  if (partner.value) {
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
  $mainColor: var(--text1);
  $secondaryColor: var(--surface2);
  position: relative;
  right: 45%;
  text-decoration: none;
  padding: 0.3rem 0.5rem;
  margin: 0.4rem;
  background-color: $mainColor;
  color: $secondaryColor;
  opacity: 85%;
  font-size: 1.2rem;
  text-decoration: none;
  border-radius: 1rem;

  &:hover {
    opacity: 100%;
  }

  @include mQ($breakpoint-sm) {
    font-size: 0.8rem;
    padding: 0.1rem 0.2rem;
    margin: 0.1rem;
  }
}
</style>