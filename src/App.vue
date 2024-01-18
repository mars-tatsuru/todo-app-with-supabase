<script setup lang="ts">
// コンポネントの読み込み

// vueのライブラリの読み込み
import { RouterView } from 'vue-router'
import { onMounted, onBeforeMount, ref } from 'vue'
</script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
body {
  background-color: #e3e5e6;
  color: #000;
  padding: 0 10px;
  overflow: hidden;
}
</style>
