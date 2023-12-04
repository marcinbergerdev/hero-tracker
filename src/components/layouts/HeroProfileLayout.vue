<template>
  <div class="hero-card-wrapper">
    <LoadingSpinner v-if="isLoadingSpinner" />

    <div class="hero-container" v-else>
      <header class="hero-header">
        <h1 class="hero-header__name">
          {{ setHouseName }}
        </h1>
      </header>

      <HouseCard
        view="members"
        v-if="routeName === 'house'"
        :members="setHouseMembers"
      ></HouseCard>
      <PersonCard view="person" v-else :person="setPersonDetails"></PersonCard>

      <BaseButton
        mode="border"
        class="backButton"
        :isLink="true"
        :to="`/${routeName === 'house' ? 'houses' : 'persons'}`"
        >Back</BaseButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
const LoadingSpinner = defineAsyncComponent(
  () => import("../spinner/LoadingSpinner.vue")
);
const HouseCard = defineAsyncComponent(() => import("../content/HouseCard.vue"));
const PersonCard = defineAsyncComponent(() => import("../content/PersonCard.vue"));
import { Character, Person, House } from "../../../types/members";
import { useGetHeroes } from "../../../store/getHeroes";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { computed, watchEffect, defineAsyncComponent } from "vue";

const route = useRoute();
const routeName = String(route.name);
const path = route.params.id;

const heroes = useGetHeroes();
const { selectedHeroes, isLoadingSpinner } = storeToRefs(heroes);
const { setHeroes } = heroes;

const setHouseName = computed<string>(() => {
  const { house, name }: { house: House; name: string } = selectedHeroes.value[0];

  if (routeName === "house") return name;
  return house?.name || "No house";
});

const setHouseMembers = computed<Person[]>(() => {
  const { members }: { members: Person[] } = selectedHeroes.value[0];
  return members;
});

const setPersonDetails = computed<Character>(() => {
  const person: Character = selectedHeroes.value[0];
  return person;
});

watchEffect(async () => {
  await setHeroes(`${routeName}/${path}`);
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
  color: var(--text-clr);
}

.hero-header {
  @include flex-center;
  flex: 1;
  margin: 3rem 0;

  &__name {
    padding: 0 2rem;
    text-align: center;
    font-size: 3.5rem;
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

.quotes {
  text-align: start;
  padding: 4rem 0;
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

.backButton {
  padding: 0.5rem 0;
  width: min(10rem, 90%);
}
</style>
