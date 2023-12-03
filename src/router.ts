import { createRouter, createWebHistory } from "vue-router";
import { useUserWindowSize } from "../store/userWindowSize";
import { useMobileMenuVisibility } from "../store/mobileMenuVisibility";

const HousesList = () => import("./components/content/HousesList.vue");
const PersonsList = () => import("./components/content/PersonsList.vue");
const QuotesList = () => import("./components/content/QuotesList.vue");
const HeroCard = () => import("./components/layouts/HeroCard.vue");

export const router = createRouter({
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
         component: HeroCard,
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
         component: HeroCard,
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

router.beforeEach((_, __) => {
   const width = useUserWindowSize();
   const menu = useMobileMenuVisibility();
   if (width.isMobile) menu.closeMenu();
});
