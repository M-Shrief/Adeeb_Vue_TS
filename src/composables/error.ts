// if there's an error in axios requests, we handle it here
// We use response.data.status && response.data.messages
// define error;
// we use watch(), to show the error for 3 seconds, after error has changed
// we should handle axios' errors in components and stores
// show them in a generic position for server errors
// and localize client errors close to the relative component
// should be extendible to show successfull notification like purchassing.

/**
 * Let's start to show pop up error for fallen server requests
 * making sure that the app doesn't crash
 * charactaristics: red on the bottom Left
 * */
import { ref } from 'vue';
import type { AxiosError } from 'axios';

export let error = ref();

export const useAxiosError = async (httpError: AxiosError) => {
  if (httpError.response?.data) {
    error.value = httpError.response.data;
  } else if (httpError.message) {
    error.value = httpError;
  }

  setTimeout(() => {
    error.value = null;
  }, 3000);
};
