<template>
  <SearchContainerLayout>
    <template #search>
      <input
        class="form-input"
        type="text"
        v-model="houseName"
        @input="elementFilteringByNameOnMobile"
        placeholder="Search house..."
      />
    </template>

    <template #default>
      <li
        class="house-list-box"
        v-for="(house, id) in filteredHousesOnDesktop || filteredHousesOnMobile"
        :key="id"
      >
        <BaseButton
          mode="filled"
          class="house-list-box__link"
          :isLink="true"
          :path="`/houses/${house.slug}`"
        >
          {{ house.name }}</BaseButton
        >
      </li>
    </template>
  </SearchContainerLayout>
</template>

<script setup lang="ts">
const SearchContainerLayout = defineAsyncComponent(
  () => import("../layouts/SearchContainerLayout.vue")
);
import { House } from "../../../types/members";
import { useGetHeroes } from "../../../store/getHeroes.ts";
import { useUserWindowSize } from "../../../store/userWindowSize";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { ref, onMounted, computed, defineAsyncComponent } from "vue";

const width = useUserWindowSize();
const route = useRoute();

const houses = ref<House[]>([]);
const houseName = ref("");
const filteredHousesOnMobile = ref<House[]>([]);

const heroes = useGetHeroes();
const { selectedHeroes } = storeToRefs(heroes);
const { setHeroes } = heroes;

const filteredHousesOnDesktop = computed(() => {
  const selectedHouses = elementFiltering();
  return selectedHouses;
});

const elementFilteringByNameOnMobile = (e: Event) => {
  const inputValue = (e.target as HTMLFormElement).value;
  houseName.value = inputValue;

  if (width.isMobile) {
    const selectedHouses = elementFiltering();
    filteredHousesOnMobile.value = [...selectedHouses];
  }
};

const elementFiltering = () => {
  const selectedHouses = houses.value.filter((house) =>
    house.name.toLowerCase().includes(houseName.value.trim().toLowerCase())
  );
  return selectedHouses;
};

onMounted(async () => {
  const routePath = String(route.name);
  await setHeroes(routePath);
  
  if (selectedHeroes.value && Array.isArray(selectedHeroes.value))
    return (houses.value = [...selectedHeroes.value]);
});
</script>

<style scoped lang="scss">
.house-list-box {
  width: min(30rem, 100%);
  text-align: center;
  &__link {
    display: block;
    padding: 1.5rem 0;
  }
}
</style>
