/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProcedure = /* GraphQL */ `
  query GetProcedure($id: ID!) {
    getProcedure(id: $id) {
      id
      name
      what
      why
      options
      lifeAfter
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listProcedures = /* GraphQL */ `
  query ListProcedures(
    $filter: ModelProcedureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProcedures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        what
        why
        options
        lifeAfter
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncProcedures = /* GraphQL */ `
  query SyncProcedures(
    $filter: ModelProcedureFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProcedures(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        what
        why
        options
        lifeAfter
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getDoctor = /* GraphQL */ `
  query GetDoctor($id: ID!) {
    getDoctor(id: $id) {
      id
      firstName
      lastName
      phoneNum
      email
      zipcode
      city
      state
      field
      workYear
      info
      intro
      iconPic
      bkgdPic
      profilePic
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listDoctors = /* GraphQL */ `
  query ListDoctors(
    $filter: ModelDoctorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDoctors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        phoneNum
        email
        zipcode
        city
        state
        field
        workYear
        info
        intro
        iconPic
        bkgdPic
        profilePic
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncDoctors = /* GraphQL */ `
  query SyncDoctors(
    $filter: ModelDoctorFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDoctors(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        firstName
        lastName
        phoneNum
        email
        zipcode
        city
        state
        field
        workYear
        info
        intro
        iconPic
        bkgdPic
        profilePic
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
