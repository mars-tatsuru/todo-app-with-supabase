<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import FieldWrapper from "@/components/FieldWrapper.vue";
import InputField from "@/components/InputField.vue";
import FormControl from "@/components/FormControl.vue";
import TodoItem from "@/components/TodoItem.vue";
import Layout from "@/components/Layout.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";


</script>

<template>
  <Layout>
    <Header />
    <div class="inputWrapper">
      <InputField />
    </div>
    <div class="todoItemWrapper">
      <TodoItem />
    </div>
    <Footer />
  </Layout>
</template>

<style scoped lang="scss">
.inputWrapper{
  padding: 50px 0;
}

.todoItemWrapper{
  padding: 0;
}
</style>
