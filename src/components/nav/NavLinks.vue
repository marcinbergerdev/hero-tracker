<template>
  <ul class="links-list">
    <li class="links-list__box" v-for="({ path, name }, id) in links" :key="id">
      <BaseButton mode="empty" :isLink="true" :to="path"> {{ name }}</BaseButton>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Links } from "../../../types/links";

const links = ref<Links[]>([
  { path: "/houses", name: "Houses" },
  { path: "/persons", name: "Persons" },
  { path: "/quotes", name: "Quotes" },
]);
</script>

<style scoped lang="scss">
.links-list {
  @include flex-center;
  gap: 3rem;

  &__box {
    font-size: 1.8rem;
  }
}
</style>
