<template>
  <section id="auth-form">
    <h3>{{ registered ? "تسجيل حساب جديد" : "تسجيل الدخول" }} </h3>
    <form method="POST" @submit.prevent="() => onSubmit()">
      <div v-if="registered" class="input-cont">
        <label for="fullname">الاسم: </label>
        <input type="text" name="fullname" id="fullname" required>
      </div>
      <div v-if="registered" class="input-cont">
        <label for="addresses">العنوان: </label>
        <input type="text" name="addresses" id="addresses" required>
      </div>
      <div class="input-cont">
        <label for="phone">رقم الهاتف: </label>
        <input type="text" name="phone" id="phone" required>
      </div>
      <div class="input-cont">
        <label for="password">كلمة السر: </label>
        <input type="password" name="password" id="password" required>
      </div>
      <button type="submit">التأكيد</button>
    </form>
    <button id="toggle" @click="() => registered = !registered">
      {{ registered ? "تسجيل الدخول" : "تسجيل حساب جديد" }}</button>
  </section>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
// stores
import { usePartnerStore } from '@/stores/partners';
// types
import type { Partner } from '@/stores/__types';

const props = defineProps({
  registered: {
    type: Boolean,
    default: false
  },
})

const router = useRouter();
const partnerStore = usePartnerStore();

async function onSubmit() {
  let partner;
  if (!props.registered) {
    partner = {
      phone: (document.getElementById('phone') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
    } as Partner;
    await partnerStore.login(partner)
      .then(() => router.push('/partners/history'))
      .catch(err => alert('Invalid information'));
  } else {
    partner = {
      fullname: (document.getElementById('fullname') as HTMLInputElement).value,
      addresses: (document.getElementById('addresses') as HTMLInputElement).value,
      phone: (document.getElementById('phone') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
    } as Partner;
    await partnerStore.signup(partner)
      .then(() => router.push('/partners/history'))
      .catch(err => alert('Invalid information'));
  }
}

</script>

<style lang="scss" scoped>
$secondaryColor: #D5DBB3;
$mainColor: #1f2124;

#auth-form {
  position: relative;
  height: 40vh;
  margin: 1rem;
  padding: 1.5rem;
  background-color: $mainColor;
  border-radius: 1rem;
  color: $secondaryColor;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;

  h3 {
    text-align: center;
  }

  .input-cont {
    display: block;
    padding: 0.2rem;
    margin: 0.3rem;

    input {
      background: $secondaryColor;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
      border: none;
      border-radius: 8px;

    }
  }

  button {
    background-color: $secondaryColor;
    color: $mainColor;
    border: none;
    border-radius: 1rem;
    padding: 0.5rem;
    cursor: pointer;
    font-weight: 600;
  }

  button[type='submit'] {
    position: relative;
    right: 45%;
  }

  #toggle {
    position: absolute;
    left: 0.3rem;
    bottom: 0.5rem;
  }
}
</style>

