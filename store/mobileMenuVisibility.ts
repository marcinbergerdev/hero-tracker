import { defineStore } from "pinia";
import { ref } from "vue";

export const useMobileMenuVisibility = defineStore(
   "mobileMenuVisibility",
   () => {
      const isActive = ref<boolean>(false);

      const toggleMenu = () => {
         isActive.value = !isActive.value;
      };

      const closeMenu = () => {
         isActive.value = false;
      };

      return { isActive, toggleMenu, closeMenu };
   }
);
