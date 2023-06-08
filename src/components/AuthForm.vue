<template>
  <section id="auth-form">
    <h3>{{ isRegistered ? "تسجيل الدخول" : "تسجيل حساب جديد" }} </h3>
    <Form @submit="onSubmit">
      <div v-if="!isRegistered" class="input-cont">
        <label for="name">الاسم: </label>
        <Field name="name" id="name" :rules="nameRules" />
        <ErrorMessage name="name" class="error" />
      </div>
      <div v-if="!isRegistered" class="input-cont">
        <label for="address">العنوان: </label>
        <Field name="address" id="address" :rules="addressRules" />
        <ErrorMessage name="address" class="error" />
      </div>
      <div class="input-cont">
        <label for="phone">رقم الهاتف: </label>
        <Field name="phone" id="phone" :rules="phoneRules" />
        <ErrorMessage name="phone" class="error" />
      </div>
      <div class="input-cont">
        <label for="password">كلمة السر: </label>
        <Field type="password" name="password" id="password"
          :rules="passwordRules" />
        <ErrorMessage name="password" class="error" />
      </div>
      <button type="submit">التأكيد</button>
    </Form>
    <button id="toggle" @click="isRegistered = !isRegistered">
      {{ !isRegistered ? "تسجيل الدخول" : "تسجيل حساب جديد" }}
    </button>
  </section>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router';
// Validation
import { Form, Field, ErrorMessage } from 'vee-validate';
import { nameRules, phoneRules, addressRules, passwordRules } from '../forms.schema'
// stores
import { usePartnerStore } from '@/stores/partners';
// Composables
import { useAxiosError } from '@/composables/error';
const isRegistered = ref(true);


const router = useRouter();
const partnerStore = usePartnerStore();


const partner = computed(() => {
  return partnerStore.getPartner;
})
async function onSubmit(values: any) {
  if (isRegistered.value) {
    await partnerStore.login(values)
      .then(() => {
        if (partner.value) router.push('/');
      })
      .catch(error => useAxiosError(error));
  } else {
    await partnerStore.signup(values)
      .then(() => {
        if (partner.value) router.push('/');
      })
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

  .error {
    color: #c80815;
    margin-right: 1rem;
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

