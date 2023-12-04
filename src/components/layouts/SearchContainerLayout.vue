<template>
  <div class="search-wrapper">
    <header class="search-header">
      <form class="search-form" @submit.prevent>
        <div class="form-box">
          <slot name="search"></slot>
        </div>
      </form>
    </header>

    <LoadingSpinner v-if="isLoadingSpinner" />
    <p class="error-message" v-else-if="!!errorMessage">{{ errorMessage }}</p>
    <section class="search-list-container" v-else>
      <ul class="search-list">
        <slot></slot>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
const LoadingSpinner = defineAsyncComponent(
  () => import("../spinner/LoadingSpinner.vue")
);
import { storeToRefs } from "pinia";
import { useGetHeroes } from "../../../store/getHeroes.ts";
import { defineAsyncComponent } from "vue";
const heroes = useGetHeroes();
const { isLoadingSpinner , errorMessage} = storeToRefs(heroes);
</script>

<style scoped lang="scss">
.search-wrapper {
  position: relative;
  margin: 0 auto;
  width: min(70rem, 90%);
  height: inherit;
}

.search-header {
  @include flex-center;
  justify-content: center;
  padding: 7rem 0;
}

.search-list-container {
  padding: 3rem 0;
  height: calc(100vh - 17.5rem - 6rem);
  overflow: auto;
}

.search-list {
  @include flex-center;
  flex-direction: column;
  justify-content: center;
  gap: 3rem 0;
  margin: 0 auto;
  padding: 0 3rem;

  @media (width >= 768px) {
    justify-content: space-between;
    flex-flow: wrap row;
  }
}
</style>
