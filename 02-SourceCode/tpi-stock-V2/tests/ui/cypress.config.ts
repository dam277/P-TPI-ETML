import { defineConfig } from "cypress";
import Tasks from "./cypress/support/tasks";

// Get the passed variables
const cariModules = process.env.npm_config_cariModule ? process.env.npm_config_cariModule.replace(/\./g, "/").split(",") : []; // Get the cari module to test

// Export the configuration
module.exports = defineConfig
({                              
    projectId: "xnvtaw",
    watchForFileChanges: false,
    defaultCommandTimeout: 30000,
    viewportHeight: 1080,
    viewportWidth: 1920,
    
    // Setup e2e testing configuration
    e2e: 
    {
        // Setup the node events
        setupNodeEvents(on, config) 
        {
            // Setup events
            on("task", Tasks);
        },
        specPattern: cariModules.length > 0 ? cariModules.flatMap((module) => [`cypress/e2e/${module}/**/*.js`, `cypress/e2e/${module}/**/*.ts`]) : ["cypress/e2e/**/*.js", "cypress/e2e/**/*.ts"],
    },

    // Setup component testing configuration
    component: undefined
});
