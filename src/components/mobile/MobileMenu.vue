<template>
  <Teleport to="body">
    <div class="mobile-menu-container" :class="isMenuActive">
      <Hamburger view="mobile-menu-hamburger" />
      <NavLinks view="mobile-menu-links-list" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import Hamburger from "../hamburger/Hamburger.vue";
import NavLinks from "../nav/NavLinks.vue";
import { useMobileMenuVisibility } from "../../../store/mobileMenuVisibility";
import { computed } from "vue";


const menu = useMobileMenuVisibility();

const isMenuActive = computed(() => {
  return { "menu-active": menu.isActive };
});
</script>

<style scoped lang="scss">
.mobile-menu-container {
  position: absolute;
  top: 0;
  left: -100%;

  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100vh;
  background-color: var(--header-bg);
  transition: translate 0.25s ease-in-out;
}

.menu-active {
  translate: 100%;
  transition: translate 0.25s ease-in-out;
}
</style>
