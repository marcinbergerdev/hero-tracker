<template>
  <div class="houses-wrapper">
    <header class="houses-header">
      <form class="houses-form">
        <div class="form-box">
          <slot name="header"></slot>
        </div>
      </form>
    </header>

    <LoadingSpinner v-if="isLoadingSpinner" />

    <section class="houses-list-container" v-else>
      <ul class="houses-list">
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
const { isLoadingSpinner } = storeToRefs(heroes);
</script>

<style scoped lang="scss">

.houses-wrapper {
  position: relative;
  margin: 0 auto;
  width: min(70rem, 90%);
  height: inherit;
}

.houses-header {
  @include flex-center;
  justify-content: center;
  padding: 7rem 0;
}

.houses-form,
.form-box {
  width: 100%;
}
.houses-list-container {
  padding: 3rem 0;
  height: calc(100vh - 17.5rem - 6rem);
  overflow: auto;
}

.houses-list {
  @include flex-center;
  flex-direction: column;
  justify-content: center;
  gap: 3rem 0;
  margin: 0 auto;

  @media (width >= 768px) {
    justify-content: space-between;
    flex-flow: wrap row;
  }
}
</style>
