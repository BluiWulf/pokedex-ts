
import * as st from "./state.js";
import * as api from "./pokeapi.js";

export type LocationAreas = {
    count:                  number;
    next:                   string;
    previous:               string;
    results:                api.CommonData[];
};

export type Location = {
    id:                     number;
    name:                   string;
    game_index:             number;
    encounter_method_rates: EncounterMethodRate[];
    location:               api.CommonData;
    names:                  LocName[];
    pokemon_encounters:     PokemonEncounter[];
};

type EncounterMethodRate = {
    encounter_method:       api.CommonData;
    version_details:        EncounterVersion[];
};

type EncounterVersion = {
    rate:                   number;
    version:                api.CommonData;
};

type LocName = {
    name:                   string;
    language:               api.CommonData;
}

type PokemonEncounter = {
    pokemon:                api.CommonData;
    version_details:        PokemonVersion[];
};

type PokemonVersion = {
    version:                api.CommonData;
    max_chance:             number;
    encounter_details:      EncounterDetail[];
};

type EncounterDetail = {
    min_level:              number;
    max_level:              number;
    condition_values:       api.CommonData[];
    chance:                 number;
    method:                 api.CommonData;
};

export async function commandMap(state: st.State): Promise<void> {
    const areas = await state.api.fetchLocations(state.next ?? undefined);
    
    state.next = areas.next;
    state.prev = areas.previous;

    for (const area of areas.results) {
        console.log(area.name);
    }
}

export async function commandMapb(state: st.State): Promise<void> {
    if (state.prev === null) {
        console.log("You're on the first page");
        return;
    }
    const areas = await state.api.fetchLocations(state.prev);
    
    state.next = areas.next;
    state.prev = areas.previous;

    for (const area of areas.results) {
        console.log(area.name);
    }
}

export async function commandExplore(state: st.State, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        console.error("location area must be provided");
        return;
    }
    if (args.length > 1) {
        console.error("only provide one location area");
        return;
    }
    const area = args[0];
    const loc = await state.api.fetchLocation(area);

    console.log(`\nExploring ${area}...\nFound Pokemon:`)
    for (const encounter of loc.pokemon_encounters) {
        console.log(` - ${encounter.pokemon.name}`)
    }
    console.log("")
}
