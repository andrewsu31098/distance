/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTown = /* GraphQL */ `
  query GetTown($id: ID!) {
    getTown(id: $id) {
      id
      name
      imageNumber
      createdAt
      updatedAt
    }
  }
`;
export const listTowns = /* GraphQL */ `
  query ListTowns(
    $filter: ModelTownFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTowns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        imageNumber
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const townByNumber = /* GraphQL */ `
  query TownByNumber(
    $imageNumber: String
    $sortDirection: ModelSortDirection
    $filter: ModelTownFilterInput
    $limit: Int
    $nextToken: String
  ) {
    townByNumber(
      imageNumber: $imageNumber
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        imageNumber
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
