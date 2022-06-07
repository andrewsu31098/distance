/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTown = /* GraphQL */ `
  mutation CreateTown(
    $input: CreateTownInput!
    $condition: ModelTownConditionInput
  ) {
    createTown(input: $input, condition: $condition) {
      id
      name
      imageNumber
      createdAt
      updatedAt
    }
  }
`;
export const updateTown = /* GraphQL */ `
  mutation UpdateTown(
    $input: UpdateTownInput!
    $condition: ModelTownConditionInput
  ) {
    updateTown(input: $input, condition: $condition) {
      id
      name
      imageNumber
      createdAt
      updatedAt
    }
  }
`;
export const deleteTown = /* GraphQL */ `
  mutation DeleteTown(
    $input: DeleteTownInput!
    $condition: ModelTownConditionInput
  ) {
    deleteTown(input: $input, condition: $condition) {
      id
      name
      imageNumber
      createdAt
      updatedAt
    }
  }
`;
