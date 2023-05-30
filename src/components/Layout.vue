<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";


</script>

<template>
  <div class="layout">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.layout{
  max-width: 500px;
  width: 100%;
  padding: 50px 20px;
  margin: 0 auto;
}
</style>
