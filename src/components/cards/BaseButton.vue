<template>
  <router-link :class="mode" v-if="isLink" :to="path">
    <slot />
  </router-link>

  <button :class="mode" v-else>
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  mode?: string;
  isLink?: boolean;
  path?: any;
}>();
</script>

<style scoped lang="scss">
.empty {
  color: var(--text-clr);
}

.router-link-active {
  opacity: 1;
  transition: 0.3s ease-in-out;
}
.filled {
  font-size: 1.5rem;
  color: var(--text-clr);
  background-color: var(--header-bg);
  border-radius: 1.3rem;
  opacity: 0.7;

  @media (width >= 768px) {
    transition: opacity 0.15s ease-in-out;
    &:hover {
      opacity: 1;
      transition: opacity 0.15s ease-in-out;
    }
  }
}

.border {
  text-align: center;
  font-size: 1.7rem;
  border-radius: 1.3rem;
  color: var(--text-clr);
  background-color: var(--header-bg);

  @media (width >= 768px) {
    border: 2px solid var(--header-bg);
    background-color: transparent;
    transition: background-color 0.15s ease-in-out;
    &:hover {
      background-color: var(--header-bg);
      transition: background-color 0.15s ease-in-out;
    }
  }
}
</style>
