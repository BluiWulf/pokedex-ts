
import * as readline from "node:readline";
import * as sysCmds from "./system_commands.js";
import * as st from "./state.js";

// Core Functions
export function startPokedex(state: st.State) {
    state.scanner.prompt();
    state.scanner.on('line', (input: string) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            state.scanner.prompt();
        }
        
        if (words[0] in state.commands) {
            state.commands[words[0]].callback(state);
        } else {
            console.log("Unknown command");
        }
        state.scanner.prompt();
    });
}

export function getCommands(): Record<string, st.CLICommand> {
    return {
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