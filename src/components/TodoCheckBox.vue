<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";


</script>

<template>
  <div class="checkBtn">
    <input type="checkbox">
  </div>
</template>

<style scoped lang="scss">
.checkBtn{

  width: 20px;
  height: 20px;

  input{
    width: 100%;
    height: 100%;
    background: #fff;
    color: #000;
    border-radius: 5px;
  }
}
</style>
