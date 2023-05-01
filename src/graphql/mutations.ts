/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      email
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      email
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      email
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createIdea = /* GraphQL */ `
  mutation CreateIdea(
    $input: CreateIdeaInput!
    $condition: ModelIdeaConditionInput
  ) {
    createIdea(input: $input, condition: $condition) {
      id
      content
      owner
      user {
        id
        email
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      ideaUserId
    }
  }
`;
export const updateIdea = /* GraphQL */ `
  mutation UpdateIdea(
    $input: UpdateIdeaInput!
    $condition: ModelIdeaConditionInput
  ) {
    updateIdea(input: $input, condition: $condition) {
      id
      content
      owner
      user {
        id
        email
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      ideaUserId
    }
  }
`;
export const deleteIdea = /* GraphQL */ `
  mutation DeleteIdea(
    $input: DeleteIdeaInput!
    $condition: ModelIdeaConditionInput
  ) {
    deleteIdea(input: $input, condition: $condition) {
      id
      content
      owner
      user {
        id
        email
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      ideaUserId
    }
  }
`;
