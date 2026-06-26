
import { createInterface, type Interface } from "node:readline";
import * as repl from "./repl.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
    name:           string;
    description:    string;
    callback:       (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    scanner:        Interface;
    commands:       Record<string, CLICommand>;
    api:            PokeAPI;
    next:           string | null;
    prev:           string | null;
};

export function initState(cacheReapInterval: number): State {

    const state: State = {
        scanner: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > ",
        }),
        commands: repl.getCommands(),
        api: new PokeAPI(cacheReapInterval),
        next: null,
        prev: null,
    };

    return state;
}
