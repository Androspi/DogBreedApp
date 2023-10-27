export type BreedParams = { find: string; limit: number | undefined; } | { find: undefined; limit: number; };
export type Breed = Record<string, string[]>;
