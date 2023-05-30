<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";


</script>

<template>
  <div class="inputField">
    <input type="text">
    <button>add</button>
  </div>
</template>

<style scoped lang="scss">
.inputField{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  input{
    width: 100%;
    padding: 5px;
    background-color: #fff;
    border: 1px solid #d1d1d1;
    border-radius: 5px;
  }

  button{
    padding: 5px 10px;
    background-color: #fff;
    border: 1px solid #d1d1d1;
    border-radius: 5px;
  }

}
</style>
