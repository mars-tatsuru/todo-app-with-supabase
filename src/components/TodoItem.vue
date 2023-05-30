<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import TodoCheckBox from "./TodoCheckBox.vue";
import TodoDeleteButton from "./TodoDeleteButton.vue";


</script>

<template>
  <div class="todoItem">
    <TodoCheckBox />
    <TodoDeleteButton />
  </div>
</template>

<style scoped lang="scss">
.todoItem{
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  background-color: #9bb2de;
  width: 100%;
  color: #000;
  border-radius: 5px;
}
</style>
