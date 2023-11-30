<template>
  <router-link :class="mode" v-if="isLink" :to="to">
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
  to: string;
}>();
</script>

<style scoped lang="scss">

.empty{
  color: var(--text-clr);
}


</style>
