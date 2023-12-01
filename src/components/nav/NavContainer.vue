<template>
  <nav class="nav-container">
    <NavLogo />
    <Hamburger v-if="width.isMobile" />
    <NavLinks v-else />
  </nav>
</template>

<script setup lang="ts">
const NavLogo = defineAsyncComponent(() => import("./NavLogo.vue"));
const Hamburger = defineAsyncComponent(() => import("../hamburger/Hamburger.vue"));
const NavLinks = defineAsyncComponent(() => import("./NavLinks.vue"));
import { defineAsyncComponent } from "vue";
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
