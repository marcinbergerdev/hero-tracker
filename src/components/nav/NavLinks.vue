<template>
  <ul class="links-list" :class="view">
    <li class="links-list__box" v-for="({ path, name }, id) in links" :key="id">
      <BaseButton mode="empty" :is-link="true" :path="path"> {{ name }}</BaseButton>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Links } from "../../../types/links";
import { ref } from "vue";

defineProps<{
  view?: string;
}>();

const links = ref<Links[]>([
  { path: "/houses", name: "Houses" },
  { path: "/persons", name: "Persons" },
  { path: "/quotes", name: "Quotes" },
]);
</script>

<style scoped lang="scss">
.mobile-menu-links-list {
  @include flex-center;
  flex-direction: column;
  justify-content: center;
  flex: 1;

  .links-list {
    &__box {
      font-size: 3rem;
    }
  }
}


.links-list {
  @include flex-center;
  gap: 3rem;

  &__box {
    font-size: 1.8rem;
  }
}
</style>
