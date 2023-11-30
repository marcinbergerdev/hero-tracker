import { createRouter, createWebHistory } from "vue-router";

const HousesList = () => import('./components/content/HousesList.vue');
const PersonsList = () => import('./components/content/PersonsList.vue');
const QuotesList = () => import('./components/content/QuotesList.vue');

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
         name: "persons",
         path: "/persons",
         component: PersonsList,
      },
      {
         name: "quotes",
         path: "/quotes",
         component: QuotesList,
      },
   ],
});
