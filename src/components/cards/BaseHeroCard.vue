<template>
  <div class="hero-card-wrapper">
    <LoadingSpinner v-if="isLoadingSpinner" />

    <div class="hero-container" v-else>
      <header class="hero-header">
        <h1 class="hero-header__house-name" v-if="routeName === 'house'">
          {{ membersOfHouse.name }}
        </h1>
        <h1 class="hero-header__person-name" v-else>{{ personOfHouse.name }}</h1>
      </header>

      <HouseCard view="members" v-if="routeName === 'house'" :house="membersOfHouse"></HouseCard>
      <PersonCard view="person" v-else :person="personOfHouse"></PersonCard>

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
const HouseCard = defineAsyncComponent(() => import("../content/HouseCard.vue"));
const PersonCard = defineAsyncComponent(() => import("../content/PersonCard.vue"));
import { Members, Character } from "../../../types/members.ts";
import { useGetHeroes } from "../../../store/getHeroes.ts";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { reactive, onMounted, defineAsyncComponent } from "vue";

const route = useRoute();
const routeName = String(route.name);
const path = route.params.id;

const heroes = useGetHeroes();
const { selectedHeroes, isLoadingSpinner } = storeToRefs(heroes);
const { setHeroes } = heroes;

let membersOfHouse = reactive<Members>({ name: "", members: [] });
let personOfHouse = reactive<Character>({
  house: { slug: "", name: "" },
  name: "",
  quotes: [],
  slug: "",
});

const setHouses = () => {
  membersOfHouse.name = selectedHeroes.value[0].name;
  membersOfHouse.members = selectedHeroes.value[0].members;
  console.log(membersOfHouse);
};

const setPersons = () => {
  personOfHouse.house = selectedHeroes.value[0].house;
  personOfHouse.name = selectedHeroes.value[0].name;
  personOfHouse.quotes = selectedHeroes.value[0].quotes;
  personOfHouse.slug = selectedHeroes.value[0].slug;
  console.log(personOfHouse);
};

onMounted(async () => {
  await setHeroes(`${String(routeName)}/${path}`);
  if (routeName === "house") {
    setHouses();
  } else {
    console.log(selectedHeroes.value[0]);
    setPersons();
  }
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

  &__house-name,
  &__person-name {
    text-align: center;
    font-size: 3.5rem;
    font-weight: 400;
  }

  &__person-name {
    padding: 2rem;
    border: 2px solid var(--header-bg);
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
