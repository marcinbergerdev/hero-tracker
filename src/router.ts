import { createRouter, createWebHistory } from "vue-router";

const HousesList = () => import("./components/content/HousesList.vue");
const PersonsList = () => import("./components/content/PersonsList.vue");
const QuotesList = () => import("./components/content/QuotesList.vue");
const BaseHeroCard = () => import("./components/cards/BaseHeroCard.vue");

export default createRouter({
   history: createWebHistory(),
   routes: [
      {
         path: "/",
         redirect: "houses",
      },
      {
         name: "houses",
         path: "/houses",
         component: HousesList,
      },
      {
         name: "house",
         path: "/houses/:id",
         component: BaseHeroCard,
         props: true,
      },
      {
         name: "persons",
         path: "/persons",
         component: PersonsList,
      },
      {
         name: "character",
         path: "/persons/:id",
         component: BaseHeroCard,
         props: true,
      },
      {
         name: "quotes",
         path: "/quotes",
         component: QuotesList,
      },
      {
         name: "quote",
         path: "/quotes/:id",
         component: QuotesList,
         props: true,
      },
   ],
});
