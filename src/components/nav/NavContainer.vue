<template>
  <nav class="nav-container">
    <NavLogo />
    <Hamburger />
    <NavLinks />
  </nav>
</template>

<script setup lang="ts">
import NavLogo from "./NavLogo.vue";
import Hamburger from "../hamburger/Hamburger.vue";
import NavLinks from "./NavLinks.vue";
</script>

<style scoped lang="scss">
.nav-container {
  @include flex-center;
  justify-content: space-between;
  flex: 1;

  padding: 1rem;
}
</style>
