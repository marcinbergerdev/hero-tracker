import { defineStore } from "pinia";
import { ref } from "vue";

export const useGetHeroes = defineStore("getHeroes", () => {
   const selectedHeroes = ref();
   const isLoadingSpinner = ref<boolean>(false);
   const errorMessage = ref<string>("");

   const dataValidation = (response: Response) => {
      if (!response.ok || response.status === 404) {
         throw new Error("Something goes wrong, try later!");
      }
   };

   const setHeroes = async (urlPath: string ) => {
      try {
         isLoadingSpinner.value = true;
         
         const response = await fetch(`https://api.gameofthronesquotes.xyz/v1/${urlPath}`);
         dataValidation(response);

         const data = await response.json();

         selectedHeroes.value = data;

      } catch (error: any) {
         errorMessage.value = error.message;

      } finally {
         isLoadingSpinner.value = false;
      }
   };

   return { selectedHeroes, isLoadingSpinner, errorMessage, setHeroes};
});