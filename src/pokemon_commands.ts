
import * as st from "./state.js";
import * as api from "./pokeapi.js";
import * as pokesprite from "./pokemon_sprites.js";

export type PokemonInfo = {
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
    sprites:                    Sprite[];
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
