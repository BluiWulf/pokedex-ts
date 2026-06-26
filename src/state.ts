
import { createInterface, type Interface } from "node:readline";
import { PokeAPI } from "./pokeapi.js";
import { Pokemon } from "./pokemon_commands.js";

import * as repl from "./repl.js";

export type CLICommand = {
    name:           string;
    description:    string;
    callback:       (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    scanner:        Interface;
    commands:       Record<string, CLICommand>;
    api:            PokeAPI;
    dex:            Record<string, Pokemon>;
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
        dex: {},
        next: null,
        prev: null,
    };

    return state;
}
