<template>
  <BaseSearchList>
    <template #header>
      <input
        class="form-box__input"
        type="text"
        v-model="houseName"
        placeholder="Search house..."
      />
    </template>

    <template #default>
      <li
        class="house-list-box"
        v-for="(house, id) in selectedHousesAfterFiltration"
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
  </BaseSearchList>
</template>

<script setup lang="ts">
const BaseSearchList = defineAsyncComponent(() => import("../cards/BaseSearchList.vue"));
import { Person } from "../../../types/members.ts";
import { useGetHeroes } from "../../../store/getHeroes.ts";
import { storeToRefs } from "pinia";
import { ref, onMounted, computed, defineAsyncComponent } from "vue";

const houseName = ref("");
const houses = ref<Person[]>([]);

const heroes = useGetHeroes();
const { selectedHeroes } = storeToRefs(heroes);
const { setHeroes } = heroes;

const selectedHousesAfterFiltration = computed(() => {
  const selectedHouses = houses.value.filter((house) => {
    return house.name.toLocaleLowerCase().includes(houseName.value);
  });

  return selectedHouses;
});

onMounted(async () => {
  await setHeroes("houses");
  houses.value = [...selectedHeroes.value];
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

.house-list-box {
  width: min(30rem, 100%);
  text-align: center;
  &__link {
    display: block;
    padding: 1.5rem 0;
  }
}
</style>
