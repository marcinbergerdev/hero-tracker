<template>
  <nav class="nav-container">
    <NavLogo />
    <Hamburger v-if="width.isMobile" />
    <NavLinks v-else />

    <Teleport to="body">
      <MobileMenu v-if="width.isMobile" />
    </Teleport>
  </nav>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const NavLogo = defineAsyncComponent(() => import("./NavLogo.vue"));
const Hamburger = defineAsyncComponent(() => import("../hamburger/Hamburger.vue"));
const NavLinks = defineAsyncComponent(() => import("./NavLinks.vue"));
const MobileMenu = defineAsyncComponent(() => import("../mobile/MobileMenu.vue"));

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
