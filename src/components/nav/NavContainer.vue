<template>
  <nav class="nav-container">
    <NavLogo />
    <Hamburger v-if="true"/>
    <NavLinks v-if="true"/>
  </nav>
</template>

<script setup lang="ts">
import NavLogo from "./NavLogo.vue";
import Hamburger from '../hamburger/Hamburger.vue'
import NavLinks from "./NavLinks.vue";
</script>

<style scoped lang="scss">
.nav-container{
  @include flex-center;
  justify-content: space-between;
  flex: 1;

  padding: 0.5rem;

  @media(width >= 768px){
    padding: 1rem 2rem;
  }
}
</style>
