import { createRouter, createWebHistory } from "vue-router";

const HomePage = () => '';

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
         component: HomePage,
      },
   ],
});
