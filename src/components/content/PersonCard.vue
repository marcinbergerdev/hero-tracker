<template>
  <section class="hero-list-section">
    <h3 class="person-house-name">{{ person.name }}</h3>

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
  margin: 0 auto;
  padding: 1rem;
  width: min(30rem, 90%);
  justify-content: center;
  text-align: center;
  font-size: 3rem;
  font-weight: 400;
  background-color: var(--header-bg);
  border-radius: 1rem;
}

.hero-list,
.hero-list-box {
  @include flex-center;
}
.hero-list {
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
  gap: 0 2rem;
  padding: 1rem;
  width: 100%;
  border: 2px solid var(--header-bg);
  border-radius: 1rem;

  &__slug {
    font-size: 1.5rem;
  }
}
</style>
