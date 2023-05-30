<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";


</script>

<template>
  <div class="footer">
    <p>practice</p>
  </div>
</template>

<style scoped lang="scss">
.footer{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  background-color: #727272;
  text-align: center;

  p{
    font-size: 14px;
    color: rgb(206, 206, 206);
  }
}
</style>
