<template>
  <nav class="nav-container">
    <NavLogo />
    <NavLinks />
  </nav>
</template>

<script setup lang="ts">
import NavLogo from "./NavLogo.vue";
import NavLinks from "./NavLinks.vue";
</script>

<style scoped lang="scss">
.nav-container{
  @include flex-center;

}
</style>
