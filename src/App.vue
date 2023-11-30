<template>
  <header class="header-container">
    <NavContainer></NavContainer>
  </header>

  <main class="content-container">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import NavContainer from "./components/nav/NavContainer.vue";
</script>

<style lang="scss">
.header-container {
  @include flex-center;
  justify-content: space-between;
  height: 5rem;
  background-color: var(--header-bg);
}

.content-container {
  height: calc(100vh - 5rem);
  background-color: var(--content-bg);
}
</style>
