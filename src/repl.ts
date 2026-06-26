
import * as sysCmds from "./system_commands.js";
import * as locCmds from "./location_commands.js";
import * as pokeCmds from "./pokemon_commands.js";
import * as st from "./state.js";

// Core Functions
export function startPokedex(state: st.State) {
    state.scanner.prompt();
    state.scanner.on('line', async (input: string) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            state.scanner.prompt();
            return;
        }
        
        if (words[0] in state.commands) {
            try {
                const args = words.slice(1);
                await state.commands[words[0]].callback(state, ...args);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                } else {
                    console.error(error);
                }
            }
        } else {
            console.error("unknown command");
        }
        state.scanner.prompt();
    });
}

export function getCommands(): Record<string, st.CLICommand> {
    return {
        map: {
            name: "map",
            description: "Displays the next 20 location areas",
            callback: locCmds.commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Displays the previous 20 location areas",
            callback: locCmds.commandMapb,
        },
        explore: {
            name: "explore",
            description: "Displays a list of all Pokemon in a given area (must provide name of Location Area)",
            callback: locCmds.commandExplore,
        },
        catch: {
            name: "catch",
            description: "Attempts to catch the Pokemon (must provide name of Pokemon)",
            callback: pokeCmds.commandCatch,
        },
        inspect: {
            name: "inspect",
            description: "Display details about caught Pokemon (must provide name of Pokemon)",
            callback: pokeCmds.commandInspect,
        },
        pokedex: {
            name: "pokedex",
            description: "Displays a list of all Pokemon caught and registered in the Pokedex",
            callback: pokeCmds.commandPokedex,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: sysCmds.commandHelp,
        },
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: sysCmds.commandExit,
        },
    };
}

// Helper Functions
export function cleanInput(input: string): string[] {
    return input.toLowerCase().trim().split(/\s+/);
}