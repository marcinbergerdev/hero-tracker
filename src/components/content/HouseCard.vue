<template>
  <section class="hero-list-section">
    <ul class="hero-list">
      <li class="hero-list-box" v-for="(member, id) in members" :key="id">
        <h2>{{ member.name }}</h2>
        <p class="hero-list-box__slug">( {{ member.slug }} )</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { Person } from "../../../types/members";

defineProps<{
  members?: Person[];
  view: string;
}>();
</script>

<style scoped lang="scss">
.hero-list {
  @include flex-center;
  flex-direction: column;
  gap: 2rem 0;
  margin: 0 auto;
  width: min(40rem, 90%);
}

.hero-list-box {
  @include flex-center;
  gap: 0 2rem;
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--header-bg);
  border-radius: 1rem;

  &__slug {
    font-size: 1.5rem;
  }
}
</style>
