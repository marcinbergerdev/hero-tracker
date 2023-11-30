import { createRouter, createWebHistory } from "vue-router";

const HousesList = () => import('./components/content/HousesList.vue');

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
   ],
});
