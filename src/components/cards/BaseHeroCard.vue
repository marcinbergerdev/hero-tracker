<template>
  <div class="hero-card-wrapper">
    <LoadingSpinner v-if="isLoadingSpinner" />

    <div class="hero-container" v-else>
      <header class="hero-header">
        <h1 class="hero-header__house-name">{{ membersOfHouse.name }}</h1>
      </header>

      <section class="hero-list-section">
        <ul class="hero-list">
          <li
            class="hero-list-box"
            v-for="(member, id) in membersOfHouse.members"
            :key="id"
          >
            <h2>{{ member.name }}</h2>
            <p class="hero-list-box__slug">( {{ member.slug }} )</p>
          </li>
        </ul>
      </section>
      <BaseButton mode="filled" class="backButton" :isLink="true" to="/houses"
        >Back</BaseButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const LoadingSpinner = defineAsyncComponent(
  () => import("../spinner/LoadingSpinner.vue")
);
import { Members } from "../../../types/members.ts";
import { useGetHeroes } from "../../../store/getHeroes.ts";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { reactive, onMounted, defineAsyncComponent } from "vue";

const route = useRoute();
const path = route.params.id;

const heroes = useGetHeroes();
const { selectedHeroes, isLoadingSpinner } = storeToRefs(heroes);
const { setHeroes } = heroes;

let membersOfHouse = reactive<Members>({ name: "", members: [] });

onMounted(async () => {
  await setHeroes(`house/${path}`);

  membersOfHouse.name = selectedHeroes.value[0].name;
  membersOfHouse.members = selectedHeroes.value[0].members;
});
</script>

<style scoped lang="scss">
.hero-card-wrapper {
  height: inherit;
  position: relative;
}

.hero-container {
  @include flex-center;
  flex-direction: column;
  height: calc(100vh - 4.9rem - 2rem);
  padding: 1rem 0;
  overflow: auto;
}

.hero-header {
  @include flex-center;
  flex: 1;
  margin: 3rem 0;
  &__house-name {
    text-align: center;
    color: var(--text-clr);
    font-size: 2.5rem;
    font-weight: 400;
  }
}

.hero-list-section {
  flex: 2;
  width: 100%;
}

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
  color: var(--text-clr);

  &__slug {
    font-size: 1.5rem;
  }
}

.backButton {
  padding: 0.5rem 0;
  width: min(10rem, 90%);
  text-align: center;
  font-size: 1.7rem;

  @media (width >= 768px) {
    background-color: transparent;
    border: 2px solid var(--header-bg);
    transition: background-color 0.15s ease-in-out;
    &:hover {
      background-color: var(--header-bg);
      transition: background-color 0.15s ease-in-out;
    }
  }
}
</style>
