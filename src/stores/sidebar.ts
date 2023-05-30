import { ref } from 'vue'
import { defineStore } from 'pinia'

export const sidebarStore = defineStore('sidebarStore', () => {

  const showFlag = ref<boolean>(true);

  function reversal() {
    showFlag.value = !showFlag.value
  }

  return { showFlag, reversal }
})
