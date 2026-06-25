
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

export type EncounterMethodRate = {
    encounter_method:       api.CommonData;
    version_details:        EncounterVersion[];
};

export type EncounterVersion = {
    rate:                   number;
    version:                api.CommonData;
};

export type LocName = {
    name:                   string;
    language:               api.CommonData;
}

export type PokemonEncounter = {
    pokemon:                api.CommonData;
    version_details:        PokemonVersion[];
};

export type PokemonVersion = {
    version:                api.CommonData;
    max_chance:             number;
    encounter_details:      EncounterDetail[];
};

export type EncounterDetail = {
    min_level:              number;
    max_level:              number;
    condition_values:       api.CommonData[];
    chance:                 number;
    method:                 api.CommonData;
};

export async function commandMap(state: st.State) {
    const areas = await state.api.fetchLocations(state.next ?? undefined);
    
    state.next = areas.next;
    state.prev = areas.previous;

    for (const area of areas.results) {
        console.log(area.name);
    }
}

export async function commandMapb(state: st.State) {
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
