// This file is auto-generated by @hey-api/openapi-ts

export type big_Int = unknown;

export type models_AddressConfig = {
    address?: string;
};

export type models_ChainConfig = {
    baseDappUrl?: string;
    blockExplorerUrl?: string;
    chainId?: number;
    contracts?: models_Contracts;
    indexerUrl?: string;
    ipfsApiUrl?: string;
    itemTypeIDs?: models_ItemTypeIDs;
    metadataApiUrl?: string;
    name?: string;
    nativeCurrency?: models_NativeCurrency;
    rpcUrls?: models_RPCs;
    systems?: models_SystemIds;
    vaultDappUrl?: string;
    walletApiUrl?: string;
};

export type models_Character = {
    address?: string;
    name?: string;
};

export type models_Contracts = {
    contractsVersion?: string;
    eveToken?: models_AddressConfig;
    forwarder?: models_AddressConfig;
    lensSeller?: models_AddressConfig;
    world?: models_AddressConfig;
};

export type models_ItemTypeIDs = {
    fuel?: number;
};

export type models_KillMail = {
    killer?: models_Character;
    loss_type?: models_LossType;
    solar_system_id?: number;
    timestamp?: number;
    victim?: models_Character;
};

export type models_LossType = 'ship' | 'pod' | 'unknown';

export type models_NativeCurrency = {
    decimals?: number;
    name?: string;
    symbol?: string;
};

export type models_RPCs = {
    default?: models_RPCURls;
    public?: models_RPCURls;
};

export type models_RPCURls = {
    http?: string;
    webSocket?: string;
};

export type models_SystemIds = {
    approveEVE?: string;
    bringOffline?: string;
    bringOnline?: string;
    createAndAnchorSmartGate?: string;
    createAndAnchorSmartStorageUnit?: string;
    createAndAnchorSmartTurret?: string;
    createAndDepositItemsToEphemeralInventory?: string;
    createAndDepositItemsToInventory?: string;
    createCharacter?: string;
    depositFuel?: string;
    depositToSSU?: string;
    destroyDeployable?: string;
    purchaseItem?: string;
    reportKill?: string;
    unanchor?: string;
    updateFuel?: string;
    withdrawFromEphemeralInventory?: string;
    withdrawFromInventory?: string;
    withdrawFuel?: string;
};

export type routes_AbiCfg = {
    abi?: Array<(number)>;
    chain_id?: number;
    deployed_to?: string;
    eip712?: routes_EIP712;
    name?: string;
    urls?: routes_URLs;
};

export type routes_ABIConfig = {
    base_dapp_url?: string;
    cfg?: Array<routes_AbiCfg>;
    system_ids?: models_SystemIds;
    vault_dapp_url?: string;
};

export type routes_EIP712 = {
    name?: string;
    version?: string;
};

export type routes_ERC2771 = {
    data?: string;
    deadline?: number;
    from?: string;
    gas?: number;
    nonce?: string;
    signature?: string;
    to?: string;
    value?: number;
};

export type routes_heatlhy = {
    ok?: boolean;
};

export type routes_URLs = {
    private?: Array<(string)>;
    public?: Array<(string)>;
};

export type types_AllTypesData = {
    attributes?: Array<unknown>;
    description?: string;
    name?: string;
    smartItemId?: string;
};

export type types_Attribute = {
    trait_type?: string;
    value?: unknown;
};

export type types_EphemeralInventory = {
    ephemeralInventoryItems: Array<types_InventoryItem>;
    ownerId: string;
    ownerName: string;
    storageCapacity: big_Int;
    usedCapacity: big_Int;
};

export type types_FuelModule = {
    fuelAmount: string;
    fuelConsumptionPerMin: big_Int;
    fuelMaxCapacity: string;
    fuelUnitVolume: string;
};

export type types_GateLinkModule = {
    destinationGate: string;
    gatesInRange: Array<types_SimpleSmartAssembly>;
    isLinked: boolean;
};

export type types_InventoryItem = {
    image?: string;
    itemId: string;
    name: string;
    quantity: number;
    typeId: number;
};

export type types_InventoryModule = {
    ephemeralInventoryList: Array<types_EphemeralInventory>;
    storageCapacity: big_Int;
    storageItems: Array<types_InventoryItem>;
    usedCapacity: big_Int;
};

export type types_Location = {
    x?: number;
    y?: number;
    z?: number;
};

export type types_Metadata = {
    attributes?: Array<types_Attribute>;
    description?: string;
    image?: string;
    name?: string;
    smartItemId?: string;
};

export type types_ProximityModule = {
    aggression: Array<types_SimpleSmartAssembly>;
    inProximity: Array<types_SimpleSmartAssembly>;
};

export type types_SimpleSmartAssembly = {
    assemblyType: types_SmartAssemblyEnum;
    chainId?: number;
    id?: string;
    isOnline?: boolean;
    itemId?: number;
    name?: string;
    ownerId?: string;
    ownerName?: string;
    solarSystem?: types_SolarSystem;
    state?: string;
    stateId?: number;
    typeId?: number;
};

export type types_SmartAssembly = {
    anchoredAtTime: string;
    assemblyType: types_SmartAssemblyEnum;
    chainId?: number;
    dappUrl: string;
    description: string;
    floorPrice: string;
    fuel: types_FuelModule;
    gateLink?: types_GateLinkModule;
    id: string;
    inventory?: types_InventoryModule;
    isOnline: boolean;
    isValid: boolean;
    itemId: number;
    location?: types_Location;
    name: string;
    ownerId: string;
    ownerName: string;
    proximity?: types_ProximityModule;
    region: string;
    solarSystem?: types_SolarSystem;
    solarSystemId: number;
    state: string;
    stateId: number;
    typeId: number;
};

export type types_SmartAssemblyEnum = 'SmartStorageUnit' | 'SmartTurret' | 'SmartGate' | 'Unknown';

export type types_SmartCharacter = {
    address: string;
    corpId: string;
    createdAt: big_Int;
    eveBalanceWei: string;
    gasBalanceWei: string;
    id: string;
    image?: string;
    isSmartCharacter: boolean;
    name?: string;
    smartAssemblies?: Array<types_SimpleSmartAssembly>;
};

export type types_SolarSystem = {
    location?: types_Location;
    solarSystemId: number;
    solarSystemName: string;
};

export type types_StaticData = {
    cid?: string;
    metadata?: types_Metadata;
};

export type GetAbisConfigResponse = (routes_ABIConfig);

export type GetAbisConfigError = (unknown);

export type GetConfigResponse = (models_ChainConfig);

export type GetConfigError = (unknown);

export type GetHealthResponse = (routes_heatlhy);

export type GetHealthError = (unknown);

export type GetKillmailsResponse = (Array<models_KillMail>);

export type GetKillmailsError = (unknown);

export type PostMetatransactionData = {
    /**
     * ERC2771 Meta TX object
     */
    body: routes_ERC2771;
};

export type PostMetatransactionResponse = (unknown);

export type PostMetatransactionError = (unknown);

export type GetSmartassembliesResponse = (Array<types_SimpleSmartAssembly>);

export type GetSmartassembliesError = (unknown);

export type GetSmartassembliesByIdData = {
    path: {
        /**
         * Smart Assembly ID
         */
        id: string;
    };
};

export type GetSmartassembliesByIdResponse = (types_SmartAssembly);

export type GetSmartassembliesByIdError = (unknown);

export type GetSmartcharactersResponse = (Array<types_SimpleSmartAssembly>);

export type GetSmartcharactersError = (unknown);

export type GetSmartcharactersByIdData = {
    path: {
        /**
         * Smart Character ID
         */
        id: string;
    };
};

export type GetSmartcharactersByIdResponse = (types_SmartCharacter);

export type GetSmartcharactersByIdError = (unknown);

export type GetSolarsystemsResponse = ({
    [key: string]: types_SolarSystem;
});

export type GetSolarsystemsError = (unknown);

export type GetTypesResponse = ({
    [key: string]: types_AllTypesData;
});

export type GetTypesError = (unknown);

export type GetTypesByIdData = {
    path: {
        /**
         * Game Type ID
         */
        id: string;
    };
};

export type GetTypesByIdResponse = (types_StaticData);

export type GetTypesByIdError = (unknown);