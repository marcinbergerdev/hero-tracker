<template>
  <header class="header-container">
    <NavContainer></NavContainer>

    <Teleport to="body">
      <MobileMenu v-if="width.isMobile" />
    </Teleport>
  </header>

  <main class="content-container">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
const NavContainer = defineAsyncComponent(() => import("./components/nav/NavContainer.vue"));
const MobileMenu = defineAsyncComponent(() => import("./components/mobile/MobileMenu.vue"));
import { defineAsyncComponent } from "vue";
import { useUserWindowSize } from "../store/userWindowSize";

const width = useUserWindowSize();
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
  overflow: hidden;
}
</style>
