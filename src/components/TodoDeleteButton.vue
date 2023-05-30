<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";


</script>

<template>
  <div class="deleteBtn">
    <div class="btn">
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.deleteBtn{

  width: 20px;
  height: 20px;

  .btn{
    width: 100%;
    height: 100%;
    color: #000;
    position: relative;

    span{
      position: absolute;
      top: 50%;
      left: 0%;
      transform: translate(-50%, -50%);
      display: block;
      width: 100%;
      height: 2px;
      background: #000;
      margin: 0 auto;

      &:nth-child(1){
        transform: rotate(45deg);
      }

      &:nth-child(2){
        transform: rotate(-45deg);
      }

    }

  }
}
</style>
