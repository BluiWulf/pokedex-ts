
import * as locInfo from "./location_commands.js"
import * as pokecache from "./pokecache.js";

export type CommonData = {
    name:   string;
    url:    string;
};

export class PokeAPI {
    private static readonly baseUrl     = "https://pokeapi.co/api/v2";
    private static readonly areaUrl     = PokeAPI.baseUrl + "/location-area/";
    private static readonly pokemonUrl  = PokeAPI.baseUrl + "/pokemon/";

    private cache: pokecache.Cache;

    constructor(cacheReapInterval: number) {
        this.cache = new pokecache.Cache(cacheReapInterval)
    }

    async fetchLocations(pageUrl?: string): Promise<locInfo.LocationAreas> {
        const page = pageUrl ?? PokeAPI.areaUrl;
        let entry = this.cache.get<locInfo.LocationAreas>(page);

        if (!entry) {
            try {
                const resp = await fetch(page);
                if (!resp.ok) {
                    throw new Error(`Error fetching location areas from PokeAPI: ${resp.status}`);
                }

                const data: locInfo.LocationAreas = await resp.json();
                this.cache.add(page, data);
                entry = data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }

        return entry;
    }

    async fetchLocation(locationName: string): Promise<locInfo.Location> {
        const page = PokeAPI.areaUrl + locationName + "/";
        let entry = this.cache.get<locInfo.Location>(page);

        if (!entry) {
            try {
                const resp = await fetch(page);
                if (!resp.ok) {
                    throw new Error(`Error fetching ${locationName} information from PokeAPI: ${resp.status}`);
                }

                const data: locInfo.Location = await resp.json();
                this.cache.add(page, data);
                entry = data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        }

        return entry;
    }
}
