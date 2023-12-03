<template>
  <div class="hero-card-wrapper">
    <LoadingSpinner v-if="isLoadingSpinner" />

    <div class="hero-container" v-else>
      <header class="hero-header">
        <h1 class="hero-header__house-name">
          {{ selectHouse }}
        </h1>
      </header>

      <HouseCard
        view="members"
        v-if="routeName === 'house'"
        :house="membersOfHouse"
      ></HouseCard>
      <PersonCard view="person" v-else :person="personOfHouse"></PersonCard>

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
import { Members, Character } from "../../../types/members";
import { useGetHeroes } from "../../../store/getHeroes";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { reactive, computed, onMounted, defineAsyncComponent} from "vue";

const route = useRoute();
const routeName = String(route.name);
const path = route.params.id;

const heroes = useGetHeroes();
const { selectedHeroes, isLoadingSpinner } = storeToRefs(heroes);
const { setHeroes } = heroes;

let membersOfHouse = reactive<Members>({ name: "", members: [] });
let personOfHouse = reactive<Character>({
  house: "",
  name: "",
  quotes: [],
  slug: "",
});

const selectHouse = computed(() => {
  if (routeName === "house") {
    return membersOfHouse.name;
  }
  return personOfHouse.house;
});

const setMembersOfHouse = () => {
  membersOfHouse.name = selectedHeroes.value[0].name;
  membersOfHouse.members = selectedHeroes.value[0].members;
};

const setPersonDetails = () => {
  const selectedHero = selectedHeroes.value[0];
  personOfHouse.house = selectedHero.house?.name || "No house";
  personOfHouse.name = selectedHero.name;
  personOfHouse.quotes = selectedHero.quotes;
  personOfHouse.slug = selectedHero.slug;
};

const setHeroData = async () => {
  await setHeroes(`${routeName}/${path}`);

  if (routeName === "house") {
    setMembersOfHouse();
  } else {
    setPersonDetails();
  }
};

onMounted(() => {
  setHeroData();
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

  &__house-name {
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
