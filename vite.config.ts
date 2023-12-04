import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [vue()],
   server: { host: true },
   css: {
      preprocessorOptions: {
         scss: {
            additionalData: `
            @import "./src/assets/scss/variable.scss"; @import "./src/assets/scss/_mixins.scss"; @import "./src/assets/scss/_form.scss";`,
         },
      },
   },
});
