export const fuelFactor = 0.01;
export const worldAddress = "0x7fe660995b0c59b6975d5d59973e2668af6bb9c5";
export const indexerBaseUrl = "https://indexer.mud.garnetchain.com";

export const smartAssembliesTypes = {
  84955: "Smart Gate",
  84556: "Smart Turret",
  77917: "Smart Storage Unit",
} as const;

export type SmartAssemblyType = keyof typeof smartAssembliesTypes;

export const smartAssemblyStates = {
  1: "Unanchored",
  2: "Anchored",
  3: "Online",
  4: "Destroyed",
} as const;

export type SmartAssemblyState = keyof typeof smartAssemblyStates;

export type Fuel = {
  efficiency: number;
};

export const fuels = {
  "uSOF-30": { efficiency: 0.3 },
  "SOF-40": { efficiency: 0.4 },
  "EU-40": { efficiency: 0.4 },
  "SOF-80": { efficiency: 0.8 },
  "EU-90": { efficiency: 0.9 },
} as const;

export type FuelType = keyof typeof fuels;

export type Ship = {
  mass: number;
  fuel: number;
  fuelType: keyof typeof fuels;
  image?: string;
};

export const ships: Record<string, Ship> = {
  Explorer: {
    mass: 5000000,
    fuel: 280,
    fuelType: "uSOF-30",
  },
  Forager: { mass: 11000000, fuel: 63, fuelType: "uSOF-30" },
  Juav: { mass: 14000000, fuel: 182, fuelType: "uSOF-30" },
  Microptero: {
    mass: 17000000,
    fuel: 245,
    fuelType: "SOF-40",
    image:
      "https://mainnet-game-ipfs-gateway.nursery.reitnorf.com/ipfs/QmchGgYrRT45dH9EEnnzdXGsQuxE5oCMnnckEDvA9UCHCe",
  },
  Val: {
    mass: 28000000,
    fuel: 539,
    fuelType: "SOF-40",
    image:
      "https://mainnet-game-ipfs-gateway.nursery.reitnorf.com/ipfs/QmPgFk5Csw2WbPtr5PfYvfMjnsbUGXDYNp9VmAh5qoLLV9",
  },
  Flegel: {
    mass: 145000000,
    fuel: 2990,
    fuelType: "SOF-40",
    image:
      "https://mainnet-game-ipfs-gateway.nursery.reitnorf.com/ipfs/QmXwQNtnQYJc5eT4sTAiAhudcq59qJSQghos9rVAF7zFN9",
  },
  Anser: {
    mass: 285000000,
    fuel: 7090,
    fuelType: "SOF-40",
    image:
      "https://mainnet-game-ipfs-gateway.nursery.reitnorf.com/ipfs/QmcsyZM3V81b59R3PKm8o93vMTYyh3BSXLr9iUvPM62ufY",
  },
} as const;

export type ShipType = keyof typeof ships;

export const columnWidths = {
  common: 300,
  address: 400,
  datetime: 210,
};
