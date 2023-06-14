<template>
  <!-- Navigation Raws -->
  <nav id="nav-raw" dir="rtl">
    <router-link to="/" id="logo">أديب</router-link>
    <div class="nav-row-group">
      <router-link :to="partner ? '/partners/ordering' : '/ordering'"
        class="nav-item" active-class="active">طلباتك</router-link>
      <router-link :to="partner ? '/partners/history' : '/history'"
        class="nav-item" active-class="active">مراجعة
        الطلبات</router-link>
      <router-link :to="'/about'" class="nav-item"
        active-class="active">قصتنا</router-link>

      <span v-if="partner" class="partner-name">{{ partner.name }}</span>
      <span v-if="partner" class="nav-item" @click="logout">تسجيل
        الخروج</span>
      <router-link to="/partners" class="nav-item" active-class="active" v-else>كن
        شريكاً</router-link>

      <!-- <div class="dropdown">
        <span class="partner-name">{{ partner?.name }}</span>
        <img class="partner-img" src="../../public/icons8-account-24.png"
          alt="Account">
        <div class="dropdown-content">
          <router-link to="" @click="logout"
            active-class="active">الخروج</router-link>
          <router-link to="" @click="logout"
            active-class="active">الاعدادات</router-link>
        </div>
      </div> -->
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { computed } from '@vue/reactivity';
// stores
import { useOrderStore } from '@/stores/orders';
import { usePartnerStore } from '@/stores/partners';

const router = useRouter();

const parnterStore = usePartnerStore();
const partner = computed(() => {
  return parnterStore.getPartner
})

const orderStore = useOrderStore();
async function logout() {
  parnterStore.logout()
  orderStore.reset()
  router.push('/');
}

</script>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';

#nav-raw {
  display: flex;
  flex-direction: row;
  background-color: #1f2124;
  justify-content: space-between;
  align-items: center;

  #logo {
    color: rgba($color: #f6b352, $alpha: .8);
    text-decoration: none;
    font-size: 1.4rem;
    font-weight: 700;
    padding: 0.2rem 0.4rem;
    margin: 0.4rem;
//  will-change: filter;
//  transition: filter 300ms;

    &:hover {
      color: #f6b352;
  //      filter: drop-shadow(1rem 0 2em rgba($color: #f6b352, $alpha: 0.667));

    }

    @include mQ($breakpoint-sm) {
      font-size: 1rem;
      padding: 0.1rem 0.2rem;
      margin: 0.1rem;
    }
  }

  $mainColor: #FBE6C2;

  .nav-item {
    padding: 0.2rem 0.4rem;
    margin: 0.4rem;
    color: rgba($color: $mainColor, $alpha: 0.8);
    font-size: 1.2rem;
    text-decoration: none;

    &:hover {
      color: $mainColor;
    }

    @include mQ($breakpoint-sm) {
      font-size: 0.8rem;
      padding: 0.1rem 0.2rem;
      margin: 0.1rem;
    }
  }

  .nav-item.active {
    background-color: $mainColor;
    color: #2c3e50;
    border-radius: 1rem;
  }

  .partner-name {
    background-color: $mainColor;
    color: #2c3e50;
    border-radius: 1rem;
    padding: 0.2rem 0.4rem;
    margin: 0.4rem;
    font-size: 1rem;

    @include mQ($breakpoint-sm) {
      font-size: 0.8rem;
      padding: 0.1rem 0.2rem;
      margin: 0.1rem;
    }

  }

  .partner-img {
    background-color: $mainColor;
    margin: 0 0.5rem;
  }
}


.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  left: 0.5rem;
  background-color: #2c3e50;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 0.5rem;
  border-bottom: 1px solid #fff;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: flex;
  flex-direction: column;
}
</style>