/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProcedure = /* GraphQL */ `
  mutation CreateProcedure(
    $input: CreateProcedureInput!
    $condition: ModelProcedureConditionInput
  ) {
    createProcedure(input: $input, condition: $condition) {
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
export const updateProcedure = /* GraphQL */ `
  mutation UpdateProcedure(
    $input: UpdateProcedureInput!
    $condition: ModelProcedureConditionInput
  ) {
    updateProcedure(input: $input, condition: $condition) {
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
export const deleteProcedure = /* GraphQL */ `
  mutation DeleteProcedure(
    $input: DeleteProcedureInput!
    $condition: ModelProcedureConditionInput
  ) {
    deleteProcedure(input: $input, condition: $condition) {
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
export const createDoctor = /* GraphQL */ `
  mutation CreateDoctor(
    $input: CreateDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    createDoctor(input: $input, condition: $condition) {
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
export const updateDoctor = /* GraphQL */ `
  mutation UpdateDoctor(
    $input: UpdateDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    updateDoctor(input: $input, condition: $condition) {
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
export const deleteDoctor = /* GraphQL */ `
  mutation DeleteDoctor(
    $input: DeleteDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    deleteDoctor(input: $input, condition: $condition) {
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
