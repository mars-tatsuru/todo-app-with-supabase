<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";


</script>

<template>
  <div class="inputField">
    <input type="text">
  </div>
</template>

<style scoped lang="scss">
.inputField{
  width: 60%;
  color: #000;

  input{
    width: 100%;
    padding: 5px;
    background-color: #fff;
    border: 1px solid #d1d1d1;
    border-radius: 2px;
  }
}
</style>
