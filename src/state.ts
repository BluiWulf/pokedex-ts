
import { createInterface, type Interface } from "node:readline";
import * as repl from "./repl.js";

export type CLICommand = {
    name:           string;
    description:    string;
    callback:       (state: State) => void;
};

export type State = {
    scanner:        Interface;
    commands:       Record<string, CLICommand>;
};

export function initState(): State {

    const state: State = {
        scanner: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > ",
        }),
        commands: repl.getCommands(),
    };

    return state;
}
