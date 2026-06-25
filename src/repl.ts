
import * as readline from "node:readline";
import * as sysCmds from "./system_commands.js";
import * as locCmds from "./location_commands.js";
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
                await state.commands[words[0]].callback(state);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                } else {
                    console.error(error);
                }
            }
        } else {
            console.log("Unknown command");
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