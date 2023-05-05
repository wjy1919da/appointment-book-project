/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProcedure = /* GraphQL */ `
  subscription OnCreateProcedure(
    $filter: ModelSubscriptionProcedureFilterInput
  ) {
    onCreateProcedure(filter: $filter) {
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
export const onUpdateProcedure = /* GraphQL */ `
  subscription OnUpdateProcedure(
    $filter: ModelSubscriptionProcedureFilterInput
  ) {
    onUpdateProcedure(filter: $filter) {
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
export const onDeleteProcedure = /* GraphQL */ `
  subscription OnDeleteProcedure(
    $filter: ModelSubscriptionProcedureFilterInput
  ) {
    onDeleteProcedure(filter: $filter) {
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
export const onCreateDoctor = /* GraphQL */ `
  subscription OnCreateDoctor($filter: ModelSubscriptionDoctorFilterInput) {
    onCreateDoctor(filter: $filter) {
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
export const onUpdateDoctor = /* GraphQL */ `
  subscription OnUpdateDoctor($filter: ModelSubscriptionDoctorFilterInput) {
    onUpdateDoctor(filter: $filter) {
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
export const onDeleteDoctor = /* GraphQL */ `
  subscription OnDeleteDoctor($filter: ModelSubscriptionDoctorFilterInput) {
    onDeleteDoctor(filter: $filter) {
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
