<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
</script>

<template>
  <nav class="nav">
    <!-- <ul class="list">
      <li class="item prev">
        <router-link
          :to="prevPage"
          :disabled="currentPage === 1"
          class="circle"
        >
          ←
        </router-link>
      </li>
      <li
        v-for="(page, i) in pages"
        v-show="shouldShowPage(page)"
        :key="i"
        class="item"
      >
        <router-link
          :to="page + 1 === 1 ? pageProvider : `${pageProvider}/${page + 1}`"
        >
          {{ page + 1 }}
        </router-link>
      </li>
      <li class="item next">
        <router-link
          :to="nextPage"
          :disabled="currentPage === pages.length"
          class="circle"
        >
          →
        </router-link>
      </li>
    </ul> -->
  </nav>
</template>

<style lang="scss">
.nav {
    max-width: 690px;
    margin: 30px auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 55px;
    width: 100%;
    padding: 0 10px;
}

.list {
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 0;
  margin-bottom: 0;
  justify-content: space-between;
}

.item {
  list-style: none;
  width: 30px;
  height: 30px;

  a {
    color: #585858;
    text-decoration: none;
    width: 100%;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;

    &[disabled='true'] {
      pointer-events: none;
      opacity: 0.3;
    }

    &[aria-current='page'] {
      border: 1px solid #585858;
      border-radius: 50%;
    }

  }

  &.prev {
    a {
      &[aria-current='page'] {
        color: #585858;
        background: inherit;
      }
    }
  }
}
</style>
