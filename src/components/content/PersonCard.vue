<template>
  <section class="hero-list-section">
    <h3 class="person-house-name">{{ person.house.name }}</h3>

    <ul class="hero-list quotes">
      <li class="quotes-title">
        <p>Quotes:</p>
      </li>
      <li class="hero-list-box" v-for="(member, id) in person.quotes" :key="id">
        <h2>{{ member }}</h2>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { Character } from "../../../types/members.ts";

defineProps<{
  person: Character;
  view: string;
}>();
</script>

<style scoped lang="scss">
.person-house-name {
  text-align: center;
  font-size: 3.5rem;
  font-weight: 400;
  padding: 3rem 0;
}

.hero-list {
  @include flex-center;
  flex-direction: column;
  gap: 2rem 0;
  margin: 0 auto;
  width: min(80rem, 90%);
}

.quotes {
  text-align: start;
  padding: 6rem 0;
}
.quotes-title {
  font-size: 2rem;
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
