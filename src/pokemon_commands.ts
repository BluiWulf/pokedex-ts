
import * as st from "./state.js";
import * as api from "./pokeapi.js";
import * as pokeSprite from "./pokemon_sprites.js";

export type Pokemon = {
    id:                         number;
    name:                       string;
    base_experience:            number;
    height:                     number;
    is_default:                 boolean;
    order:                      number;
    weight:                     number;
    abilities:                  Ability[];
    forms:                      api.CommonData[];
    game_indices:               GameIndex[];
    held_items:                 HeldItem[];
    location_area_encounters:   string;
    moves:                      Move[];
    species:                    api.CommonData;
    sprites:                    pokeSprite.Sprite[];
    cries:                      Cry;
    stats:                      Stat[];
    types:                      PokeType[];
    past_types:                 PastType[];
    past_abilities:             PastAbility[];
};

type PastAbility = {
    generation:                 api.CommonData;
    abilities:                  Ability[];
};

type Ability = {
    is_hidden:                  boolean;
    slot:                       number;
    ability:                    api.CommonData;
};

type GameIndex = {
    game_index:                 number;
    version:                    api.CommonData;
};

type HeldItem = {
    item:                       api.CommonData;
    version_details:            ItemVersion[];
};

type ItemVersion = {
    rarity:                     number;
    version:                    api.CommonData;
};

type Move = {
    move:                       api.CommonData;
    version_group_details:      VersionGroupDetail[];
};

type VersionGroupDetail = {
    level_learned_at:           number;
    version_group:              api.CommonData;
    move_learn_method:          api.CommonData;
    order:                      number;
};

type Cry = {
    latest:                     string;
    legacy:                     string;
};

type Stat = {
    base_stat:                  number;
    effort:                     number;
    stat:                       api.CommonData;
};

type PastType = {
    generation:                 api.CommonData;
    types:                      PokeType[];
};

type PokeType = {
    slot:                       number;
    type:                       api.CommonData;
};

export async function commandCatch(state: st.State, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        console.error("name of Pokemon must be provided");
        return;
    }
    if (args.length > 1) {
        console.error("only provide one Pokemon to catch");
        return;
    }
    const pokeName = args[0];
    const pokemon = await state.api.fetchPokemon(pokeName);
    console.log(`\nThrowing a Pokeball at ${pokeName}...`);

    const baseExp = pokemon.base_experience;
    let maxExp = 200;
    if (maxExp < baseExp) {
        maxExp += (((baseExp - maxExp) / 100) + 1) * 100;
    }
    const chance = Math.random() * maxExp;
    if (chance > baseExp) {
        console.log(`${pokeName} was caught!\n`);
        state.dex[pokeName] = pokemon;
    } else {
        console.log(`${pokeName} escaped!\n`);
    }
}

export async function commandInspect(state: st.State, ...args: string[]): Promise<void> {
    if (args.length === 0) {
        console.error("name of Pokemon must be provided");
        return;
    }
    if (args.length > 1) {
        console.error("only provide one Pokemon to catch");
        return;
    }
    const pokeName = args[0];
    
    if (pokeName in state.dex) {
        const pokemon = state.dex[pokeName];
        console.log(`\nName: ${pokeName}`);
        console.log(`Height: ${pokemon.height}`);
        console.log(`Weight: ${pokemon.weight}`);
        console.log("Stats:");
        for (const stat of pokemon.stats) {            
            console.log(`  - ${stat.stat.name}: ${stat.base_stat}`);
        }
        console.log("Types:");
        for (const types of pokemon.types) {            
            console.log(`  - ${types.type.name}`);
        }
        console.log("");
    } else {
        console.error("you have not caught that pokemon");
    }
}

export async function commandPokedex(state: st.State): Promise<void> {
    if (Object.keys(state.dex).length === 0) {
        console.error("you have not caught any Pokemon");
        return;
    }

    console.log("\nYour Pokedex:");
    for (const pokemon of Object.keys(state.dex)) {
        console.log(` - ${pokemon}`);
    }
    console.log("");
}
