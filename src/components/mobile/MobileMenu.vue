<template>
  <Teleport to="body">
    <div>
      <Hamburger />
      <NavLinks></NavLinks>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import Hamburger from "../hamburger/Hamburger.vue";
import NavLinks from "../nav/NavLinks.vue";
</script>

<style scoped></style>
