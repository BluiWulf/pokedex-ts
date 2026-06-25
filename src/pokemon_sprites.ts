
export type Sprite = {
    back_default:               string;
    back_female:                string;
    back_shiny:                 string;
    back_shiny_female:          string;
    front_default:              string;
    front_female:               string;
    front_shiny:                string;
    front_shiny_female:         string;
    other:                      OtherSet;
    versions:                   GenVersions;
};

type OtherSet = {
    dream_world:                Gen7Base;
    home:                       Gen6Base;
    official_artwork:           Gen3Base;
    showdown:                   Gen4Base;
};

type GenVersions = {
    "generation-i":             Gen1;
    "generation-ii":            Gen2;
    "generation-iii":           Gen3;
    "generation-iv":            Gen4;
    "generation-v":             Gen5;
    "generation-vi":            Gen6;
    "generation-vii":           Gen7;
    "generation-viii":          Gen8;
};

type Gen1 = {
    "red-blue":                 Gen1Base;
    yellow:                     Gen1Base;
};

type Gen2 = {
    crystal:                    Gen2Base;
    gold:                       Gen2Base;
    silver:                     Gen2Base;
};

type Gen3 = {
    emerald:                    Gen3Base;
    "firered-leafgreen":        Gen2Base;
    "ruby-sapphire":            Gen2Base;
};

type Gen4 = {
    "diamond-pearl":            Gen4Base;
    "heartgold-soulsilver":     Gen4Base;
    platinum:                   Gen4Base;
};

type Gen5 = {
    "black-white":              Gen5Base;
};

type Gen6 = {
    "omegaruby-alphasapphire":  Gen6Base;
    "x-y":                      Gen6Base;
};

type Gen7 = {
    icons:                      Gen7Base;
    "ultra-sun-ultra-moon":     Gen6Base;
};

type Gen8 = {
    icons:                      Gen7Base;
};

type Gen1Base = {
    back_default:               string;
    back_gray:                  string;
    front_default:              string;
    front_gray:                 string;
};

type Gen2Base = {
    back_default:               string;
    back_shiny:                 string;
    front_default:              string;
    front_shiny:                string;
};

type Gen3Base = {
    front_default:              string;
    front_shiny:                string;
};

type Gen4Base = {
    back_default:               string;
    back_female:                string;
    back_shiny:                 string;
    back_shiny_female:          string;
    front_default:              string;
    front_female:               string;
    front_shiny:                string;
    front_shiny_female:         string;
};

type Gen5Base = {
    animated:                   Gen4Base;
    back_default:               string;
    back_female:                string;
    back_shiny:                 string;
    back_shiny_female:          string;
    front_default:              string;
    front_female:               string;
    front_shiny:                string;
    front_shiny_female:         string;
};

type Gen6Base = {
    front_default:              string;
    front_female:               string;
    front_shiny:                string;
    front_shiny_female:         string;
};

type Gen7Base = {
    front_default:              string;
    front_female:               string;
};