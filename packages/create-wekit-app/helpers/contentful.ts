/* eslint-disable @typescript-eslint/naming-convention */
import type { ClientAPI as ContentfulManagementApi } from 'contentful-management';
import type { Collection, Space, SpaceProps, ApiKey } from 'contentful-management/types';

import { createClient } from 'contentful-management';

let managementClient: ContentfulManagementApi;

const MAX_ALLOWED_LIMIT = 1000;

export interface ClientOptions {
  accessToken: string;
}

/**
 * Get contentful management client api
 * @param {Object} options
 * @returns {*}
 */
const getManagementClient = (config: ClientOptions): ContentfulManagementApi => {
  const { accessToken } = config || {};

  if (managementClient) {
    return managementClient;
  }

  if (accessToken) {
    return createClient({
      accessToken,
    });
  }

  throw new Error('You need to login first. Run npx contentful-cli login');
};

interface SpacesAggregateArgs {
  skip: number;
  aggregatedResponse: Collection<Space, SpaceProps>;
}

/**
 * Get Contentful spaces
 * @param {Options} options
 * @returns {Array<Object>}
 */
export const getSpaces = async (
  accessToken: string,
  args?: SpacesAggregateArgs
): Promise<Space[]> => {
  let { skip = 0, aggregatedResponse = null } = args || {};
  const client = await getManagementClient({ accessToken });
  const query = {
    skip,
    limit: MAX_ALLOWED_LIMIT,
  };

  const response = await client.getSpaces(query);
  const { limit = MAX_ALLOWED_LIMIT, total, items } = response;

  if (!aggregatedResponse) {
    aggregatedResponse = response;
  } else {
    aggregatedResponse.items = aggregatedResponse.items.concat(items);
  }

  if (skip + limit <= total) {
    return getSpaces(accessToken, { skip: skip + limit, aggregatedResponse });
  }

  const { items: spaces } = aggregatedResponse;

  return spaces;
};

/**
 * Get Contentful space
 * @param {Options} options
 * @returns {Object}
 */
export const getSpace = async (spaceId: string, accessToken: string) => {
  const client = getManagementClient({ accessToken });
  return client.getSpace(spaceId);
};

/**
 * Get Contentful environments
 * @param {Options} options
 * @returns {Array<Object>}
 */
export const getEnvironments = async (spaceId: string, accessToken: string) => {
  const space = await getSpace(spaceId, accessToken);
  const { items: environments } = await space.getEnvironments();

  return environments;
};

/**
 * Fetch api key from contentful
 * @param {Object} options
 * @returns {String} accessToken
 */
export const getApiKey = async (spaceId: string, accessToken: string) => {
  const space = await getSpace(spaceId, accessToken);

  const { items: apiKeys = [] } = (await space.getApiKeys()) || {};
  const [apiKey] = apiKeys;
  const { accessToken: deliveryToken } = apiKey || {};

  return deliveryToken;
};

/**
 * Fetch preview api key from contentful
 * @param {Object} options
 * @returns {String} previewToken
 */
export const getPreviewApiKey = async (spaceId: string, accessToken: string) => {
  const space = await getSpace(spaceId, accessToken);

  const { items: previewApiKeys = [] } = await space.getPreviewApiKeys();
  const [previewApiKey] = previewApiKeys;
  const { accessToken: previewToken } = previewApiKey as ApiKey;

  return previewToken;
};
