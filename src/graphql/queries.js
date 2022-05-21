/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCity = /* GraphQL */ `
  query GetCity($id: ID!) {
    getCity(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listCitys = /* GraphQL */ `
  query ListCitys(
    $filter: ModelCityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
