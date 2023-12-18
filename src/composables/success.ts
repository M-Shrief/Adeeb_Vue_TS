import { ref } from 'vue';

export let success = ref<{message: string} | null>();

export const useSuccessNotification = async (message: string) => {
  success.value = { message };

  setTimeout(() => {
    success.value = null;
  }, 3000);
};
