<template>
  <SearchContainerLayout>
    <template #search>
      <input
        class="form-input"
        type="text"
        v-model="personName"
        @input="elementFilteringByNameOnMobile"
        placeholder="Search person..."
      />
    </template>

    <template #default>
      <li
        class="person-list-box"
        v-for="(person, id) in filteredHousesOnDesktop || filteredPersonsOnDesktop"
        :key="id"
      >
        <BaseButton
          mode="filled"
          class="person-list-box__link"
          :isLink="true"
          :path="`/persons/${person.slug}`"
        >
          {{ person.name }}</BaseButton
        >
      </li>
    </template>
  </SearchContainerLayout>
</template>

<script setup lang="ts">
const SearchContainerLayout = defineAsyncComponent(
  () => import("../layouts/SearchContainerLayout.vue")
);
import { Character } from "../../../types/members.ts";
import { useGetHeroes } from "../../../store/getHeroes.ts";
import { useUserWindowSize } from "../../../store/userWindowSize";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { ref, onMounted, computed, defineAsyncComponent } from "vue";

const width = useUserWindowSize();
const route = useRoute();

const personName = ref("");
const persons = ref<Character[]>([]);
const filteredPersonsOnDesktop = ref<Character[]>([]);

const heroes = useGetHeroes();
const { selectedHeroes } = storeToRefs(heroes);
const { setHeroes } = heroes;

const filteredHousesOnDesktop = computed(() => {
  const selectedHouses = elementFiltering();
  return selectedHouses;
});

const elementFilteringByNameOnMobile = (e: Event) => {
  const inputValue = (e.target as HTMLFormElement).value;
  personName.value = inputValue;

  if (width.isMobile) {
    const selectedHouses = elementFiltering();
    filteredPersonsOnDesktop.value = [...selectedHouses];
  }
};

const elementFiltering = () => {
  const selectedHouses = persons.value.filter((person) =>
    person.name.toLowerCase().includes(personName.value.trim().toLowerCase())
  );
  return selectedHouses;
};

onMounted(async () => {
  const routePath = String(route.name);
  await setHeroes(routePath);

  if (selectedHeroes.value && Array.isArray(selectedHeroes.value))
    return (persons.value = [...selectedHeroes.value]);
});
</script>

<style scoped lang="scss">
.person-list-box {
  width: min(25rem, 100%);
  text-align: center;
  &__link {
    display: block;
    padding: 1.5rem 0;
  }
}
</style>
