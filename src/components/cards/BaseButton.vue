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

.router-link-active{
   opacity: 1;
   transition: 0.3s ease-in-out;
}
.filled{
  font-size: 1.5rem;
  color: var(--text-clr); 
  background-color: var(--header-bg);
  border-radius: 1.3rem;
}

</style>
