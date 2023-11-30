import { defineStore } from "pinia";
import { computed } from "vue";
import { useWindowSize } from "@vueuse/core";

export const useUserWindowSize = defineStore("userWindowSize", () => {
   const { width } = useWindowSize();

   const isDesktop = computed<boolean>(() => {
      return width.value >= 768 ? true : false;
   });
   const isMobile = computed<boolean>(() => {
      return width.value < 768 ? true : false;
   });

   return { isMobile, isDesktop };
});
