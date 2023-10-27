export type BreedParams = { breed: string; limit: number | undefined; } | { breed: undefined; limit: number; };
export type Breed = Record<string, string[]>;
