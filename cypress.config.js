import { defineConfig } from 'cypress'
import { initPlugin } from '@frsource/cypress-plugin-visual-regression-diff/dist/plugins.esm.mjs'

console.log(process.env)

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      initPlugin(on, config)
    },
    baseUrl: 'http://localhost:4173/' 
  },
})
