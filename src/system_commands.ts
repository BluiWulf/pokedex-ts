
import * as st from "./state.js"

export function commandExit(state: st.State) {
    console.log("Closing the Pokedex... Goodbye!");
    state.scanner.close();
    process.exit(0);
}

export function commandHelp(state: st.State) {
    console.log("\nWelcome to the Pokedex!\nUsage:\n");
    for (const [key, value] of Object.entries(state.commands)) {
        console.log(`${key}: ${value.description}`)
    }
    console.log("")
}
