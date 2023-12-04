<template>
  <section class="random-quotes-container">
    <BaseButton mode="border" class="change-random-quotes" @click="setRandomQuotes"
      >change quotes</BaseButton
    >

    <p class="error-message" v-if="!!errorMessage">{{ errorMessage }}</p>
    <ul class="random-quotes-list" v-else>
      <li class="quotes-box" v-for="(quote, id) in randomQuotes" :key="id">
        <p class="quotes-box__sentence">{{ quote.sentence }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { Quote } from "../../../types/members";
import { useGetHeroes } from "../../../store/getHeroes.ts";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

const heroes = useGetHeroes();
const { selectedQuotes , errorMessage} = storeToRefs(heroes);
const { getQuotes } = heroes;

const randomQuotes = ref<Quote[]>([]);

const setRandomQuotes = () => {
  getRandomQuotes();
};

const getRandomQuotes = async () => {
  const urlPath = "random/5";
  await getQuotes(urlPath);

  if (selectedQuotes.value && Array.isArray(selectedQuotes.value))
    return randomQuotes.value = [...selectedQuotes.value];
};

onMounted(() => {
  getRandomQuotes();
});
</script>

<style scoped lang="scss">
.random-quotes-container,
.random-quotes-list {
  @include flex-center;
  flex-direction: column;
}

.random-quotes-container {
  height: inherit;
}

.change-random-quotes {
  padding: 0.5rem 1rem;
  margin-top: 3rem;
}
.random-quotes-list {
  flex: 1;
  gap: 5rem 0;
  margin: 10rem 0 1rem 0;
  width: min(100rem, 90%);
  overflow: auto;

  @media (width >= 768px) {
    flex-flow: wrap row;
    gap: 3rem 2rem;
  }
}

.quotes-box {
  padding: 1rem;
  width: 100%;
  text-align: start;
  border: 2px solid var(--header-bg);
  border-radius: 1rem;

  @media (width >= 768px) {
    width: 40%;
    min-height: 7rem;
  }
  &__sentence {
    font-size: 1.5rem;
    color: var(--text-clr);
  }
}
</style>
