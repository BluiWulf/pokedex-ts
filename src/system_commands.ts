
import * as st from "./state.js";

export async function commandExit(state: st.State): Promise<void> {
    console.log("Closing the Pokedex... Goodbye!");
    state.scanner.close();
    process.exit(0);
}

export async function commandHelp(state: st.State): Promise<void> {
    console.log("\nWelcome to the Pokedex!\nUsage:\n");
    for (const [key, value] of Object.entries(state.commands)) {
        console.log(`${key}: ${value.description}`)
    }
    console.log("")
}
