import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "358q26",
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", // Ruta para pruebas E2E
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}", // Ruta para pruebas de componentes
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});