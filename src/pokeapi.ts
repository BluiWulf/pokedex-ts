
export class PokeAPI {
    private static readonly baseUrl     = "https://pokeapi.co/api/v2";
    private static readonly areaUrl     = PokeAPI.baseUrl + "/location-area/";
    private static readonly pokemonUrl  = PokeAPI.baseUrl + "/pokemon/";

    constructor() {}

    async fetchLocations(pageUrl?: string): Promise<ShallowLocations> {
        return;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        return;
    }
}

export type ShallowLocations = {

};

export type Location = {

};
