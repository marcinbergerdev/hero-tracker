<template>
  <BaseSearchList>
    <template #header>
      <input
        class="form-box__input"
        type="text"
        v-model="personName"
        placeholder="Search person..."
      />
    </template>

    <template #default>
      <li
        class="person-list-box"
        v-for="(person, id) in selectedPersonsAfterFiltration"
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
  </BaseSearchList>
</template>

<script setup lang="ts">
const BaseSearchList = defineAsyncComponent(() => import("../cards/BaseSearchList.vue"));
import { Person } from "../../../types/members.ts";
import { useGetHeroes } from "../../../store/getHeroes.ts";
import { storeToRefs } from "pinia";
import { ref, onMounted, computed, defineAsyncComponent } from "vue";

const personName = ref("");
const persons = ref<Person[]>([]);

const heroes = useGetHeroes();
const { selectedHeroes } = storeToRefs(heroes);
const { setHeroes } = heroes;

const selectedPersonsAfterFiltration = computed(() => {
  const selectedPersons = persons.value.filter((person) => {
    return person.name.toLocaleLowerCase().includes(personName.value);
  });

  return selectedPersons;
});

onMounted(async () => {
  await setHeroes("characters");
  persons.value = [...selectedHeroes.value];
});
</script>

<style scoped lang="scss">
.form-box {
  &__input {
    padding: 1rem;
    width: 100%;
    color: var(--text-clr);
    background-color: transparent;
    border-radius: 1rem;
    border: 0;
    outline: 2px solid var(--text-clr);
  }
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
