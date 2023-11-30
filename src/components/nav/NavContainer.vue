<template>
  <nav class="nav-container">
    <NavLogo />
    <Hamburger v-if="width.isMobile" />
    <NavLinks v-else/>

    <MobileMenu v-if="width.isMobile"/> 
  </nav>
</template>

<script setup lang="ts">
import NavLogo from "./NavLogo.vue";
import Hamburger from "../hamburger/Hamburger.vue";
import NavLinks from "./NavLinks.vue";
import MobileMenu from "../mobile/MobileMenu.vue";
import { useUserWindowSize } from "../../../store/userWindowSize.ts";

const width = useUserWindowSize();
</script>

<style scoped lang="scss">
.nav-container {
  @include flex-center;
  justify-content: space-between;
  flex: 1;

  padding: 1rem;
}
</style>
