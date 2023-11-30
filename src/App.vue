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

<style scoped></style>
