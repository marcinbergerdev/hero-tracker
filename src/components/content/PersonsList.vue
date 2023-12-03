<template>
  <SearchList>
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
  </SearchList>
</template>

<script setup lang="ts">
const SearchList = defineAsyncComponent(() => import("../layouts/SearchList.vue"));
import { Character } from "../../../types/members.ts";
import { useGetHeroes } from "../../../store/getHeroes.ts";
import { useUserWindowSize } from "../../../store/userWindowSize";
import { storeToRefs } from "pinia";
import { ref, onMounted, computed, defineAsyncComponent } from "vue";

const width = useUserWindowSize();

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
  personName.value = (e.target as HTMLFormElement).value;

  if (width.isMobile) {
    const selectedHouses = elementFiltering();
    filteredPersonsOnDesktop.value = [...selectedHouses];
  }
};

const elementFiltering = () => {
  const selectedHouses = persons.value.filter((person) =>
    person.name.toLowerCase().includes(personName.value.toLowerCase())
  );
  return selectedHouses;
};

onMounted(async () => {
  const urlKey: string = "characters";
  await setHeroes(urlKey);
  persons.value = [...selectedHeroes.value];
});
</script>

<style scoped lang="scss">
.form-input {
  padding: 1rem;
  width: 100%;
  color: var(--text-clr);
  background-color: transparent;
  border-radius: 1rem;
  border: 0;
  outline: 2px solid var(--text-clr);
}

.person-list-box {
  width: min(30rem, 100%);
  text-align: center;
  &__link {
    display: block;
    padding: 1.5rem 0;
  }
}
</style>
