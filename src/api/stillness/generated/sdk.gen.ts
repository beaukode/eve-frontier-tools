// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type OptionsLegacyParser } from '@hey-api/client-fetch';
import type { GetAbisConfigError, GetAbisConfigResponse, GetConfigError, GetConfigResponse, GetHealthError, GetHealthResponse, GetKillmailsError, GetKillmailsResponse, PostMetatransactionData, PostMetatransactionError, PostMetatransactionResponse, GetSmartassembliesError, GetSmartassembliesResponse, GetSmartassembliesByIdData, GetSmartassembliesByIdError, GetSmartassembliesByIdResponse, GetSmartcharactersError, GetSmartcharactersResponse, GetSmartcharactersByIdData, GetSmartcharactersByIdError, GetSmartcharactersByIdResponse, GetSolarsystemsError, GetSolarsystemsResponse, GetTypesError, GetTypesResponse, GetTypesByIdData, GetTypesByIdError, GetTypesByIdResponse } from './types.gen';

export const client = createClient(createConfig());

/**
 * get ABI with some config
 * retrieve the world contracts ABIs with some config
 */
export const getAbisConfig = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<GetAbisConfigResponse, GetAbisConfigError, ThrowOnError>({
        ...options,
        url: '/abis/config'
    });
};

/**
 * get config
 * retrieve all the config needed to connect to our services
 */
export const getConfig = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<GetConfigResponse, GetConfigError, ThrowOnError>({
        ...options,
        url: '/config'
    });
};

/**
 * health endpoint
 * Tells you if the World API is ok
 */
export const getHealth = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<GetHealthResponse, GetHealthError, ThrowOnError>({
        ...options,
        url: '/health'
    });
};

/**
 * get all the kill mails reports
 * list all the kill mails reported by players
 */
export const getKillmails = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<GetKillmailsResponse, GetKillmailsError, ThrowOnError>({
        ...options,
        url: '/killmails'
    });
};

/**
 * submit a meta transaction
 * submit a meta transaction
 * Only bringOnline, bringOffline and setEntityMetadata are allowed
 */
export const postMetatransaction = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<PostMetatransactionData, ThrowOnError>) => {
    return (options?.client ?? client).post<PostMetatransactionResponse, PostMetatransactionError, ThrowOnError>({
        ...options,
        url: '/metatransaction'
    });
};

/**
 * get all the smart assemblies
 * list all the smart assemblies currently in the world
 */
export const getSmartassemblies = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<GetSmartassembliesResponse, GetSmartassembliesError, ThrowOnError>({
        ...options,
        url: '/smartassemblies'
    });
};

/**
 * get a single smart assembly
 * retrieve one smart assembly with the given id
 */
export const getSmartassembliesById = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetSmartassembliesByIdData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetSmartassembliesByIdResponse, GetSmartassembliesByIdError, ThrowOnError>({
        ...options,
        url: '/smartassemblies/{id}'
    });
};

/**
 * get all the smart characters
 * list all the smart characters currently in the world
 */
export const getSmartcharacters = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<GetSmartcharactersResponse, GetSmartcharactersError, ThrowOnError>({
        ...options,
        url: '/smartcharacters'
    });
};

/**
 * get a single smart character
 * retrieve one smart character with the given id
 */
export const getSmartcharactersById = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetSmartcharactersByIdData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetSmartcharactersByIdResponse, GetSmartcharactersByIdError, ThrowOnError>({
        ...options,
        url: '/smartcharacters/{id}'
    });
};

/**
 * get all the solar systems
 * list all the solar systems currently in the application
 */
export const getSolarsystems = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<GetSolarsystemsResponse, GetSolarsystemsError, ThrowOnError>({
        ...options,
        url: '/solarsystems'
    });
};

/**
 * get all game types
 * list all the types used in the world
 */
export const getTypes = <ThrowOnError extends boolean = false>(options?: OptionsLegacyParser<unknown, ThrowOnError>) => {
    return (options?.client ?? client).get<GetTypesResponse, GetTypesError, ThrowOnError>({
        ...options,
        url: '/types'
    });
};

/**
 * get a single type
 * get info about a single game type
 */
export const getTypesById = <ThrowOnError extends boolean = false>(options: OptionsLegacyParser<GetTypesByIdData, ThrowOnError>) => {
    return (options?.client ?? client).get<GetTypesByIdResponse, GetTypesByIdError, ThrowOnError>({
        ...options,
        url: '/types/{id}'
    });
};