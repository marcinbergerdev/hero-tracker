<template>
  <div class="houses-wrapper">
    <header class="houses-header">
      <form class="houses-form">
        <div class="form-box">
          <input
            class="form-box__input"
            type="text"
            v-model="houseName"
            placeholder="Search house..."
          />
        </div>
      </form>
    </header>

    <LoadingSpinner v-if="isLoadingSpinner" />

    <section class="houses-list-container" v-else>
      <ul class="houses-list">
        <li class="house-list-box" v-for="(house, id) in selectedHousesAfterFiltration" :key="id">
          <BaseButton
            mode="filled"
            class="house-list-box__link"
            :isLink="true"
            :path="`/houses/${house.slug}`"
          >
            {{ house.name }}</BaseButton
          >
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
const LoadingSpinner = defineAsyncComponent(
  () => import("../spinner/LoadingSpinner.vue")
);
import { Person } from "../../../types/members.ts";
import { useGetHeroes } from "../../../store/getHeroes.ts";
import { storeToRefs } from "pinia";
import { ref, onMounted, computed, defineAsyncComponent } from "vue";

const houseName = ref("");
const houses = ref<Person[]>([]);

const heroes = useGetHeroes();
const { selectedHeroes, isLoadingSpinner } = storeToRefs(heroes);
const { setHeroes } = heroes;

const selectedHousesAfterFiltration = computed(() => {
  const selectedHouses = houses.value.filter((house) => {
    return house.name.includes(houseName.value);
  });

  return selectedHouses;
});

onMounted(async () => {
  await setHeroes("houses");
  houses.value = [...selectedHeroes.value];
});
</script>

<style scoped lang="scss">
.houses-wrapper {
  position: relative;
  margin: 0 auto;
  width: min(70rem, 90%);
  height: inherit;
}
.houses-header {
  @include flex-center;
  justify-content: center;
  padding: 7rem 0;
}

.houses-form,
.form-box {
  width: 100%;
}

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

.houses-list-container {
  padding: 3rem 0;
  height: calc(100vh - 17.5rem - 6rem);
  overflow: auto;
}

.houses-list {
  @include flex-center;
  flex-direction: column;
  justify-content: center;
  gap: 3rem 0;
  margin: 0 auto;

  @media (width >= 768px) {
    justify-content: space-between;
    flex-flow: wrap row;
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
