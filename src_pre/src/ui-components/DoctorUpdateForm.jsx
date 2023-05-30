/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Doctor } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function DoctorUpdateForm(props) {
  const {
    id: idProp,
    doctor,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNum: "",
    email: "",
    zipcode: "",
    city: "",
    state: "",
    field: "",
    workYear: "",
    info: "",
    intro: "",
    iconPic: "",
    bkgdPic: "",
    profilePic: "",
  };
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [phoneNum, setPhoneNum] = React.useState(initialValues.phoneNum);
  const [email, setEmail] = React.useState(initialValues.email);
  const [zipcode, setZipcode] = React.useState(initialValues.zipcode);
  const [city, setCity] = React.useState(initialValues.city);
  const [state, setState] = React.useState(initialValues.state);
  const [field, setField] = React.useState(initialValues.field);
  const [workYear, setWorkYear] = React.useState(initialValues.workYear);
  const [info, setInfo] = React.useState(initialValues.info);
  const [intro, setIntro] = React.useState(initialValues.intro);
  const [iconPic, setIconPic] = React.useState(initialValues.iconPic);
  const [bkgdPic, setBkgdPic] = React.useState(initialValues.bkgdPic);
  const [profilePic, setProfilePic] = React.useState(initialValues.profilePic);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = doctorRecord
      ? { ...initialValues, ...doctorRecord }
      : initialValues;
    setFirstName(cleanValues.firstName);
    setLastName(cleanValues.lastName);
    setPhoneNum(cleanValues.phoneNum);
    setEmail(cleanValues.email);
    setZipcode(cleanValues.zipcode);
    setCity(cleanValues.city);
    setState(cleanValues.state);
    setField(cleanValues.field);
    setWorkYear(cleanValues.workYear);
    setInfo(cleanValues.info);
    setIntro(cleanValues.intro);
    setIconPic(cleanValues.iconPic);
    setBkgdPic(cleanValues.bkgdPic);
    setProfilePic(cleanValues.profilePic);
    setErrors({});
  };
  const [doctorRecord, setDoctorRecord] = React.useState(doctor);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp ? await DataStore.query(Doctor, idProp) : doctor;
      setDoctorRecord(record);
    };
    queryData();
  }, [idProp, doctor]);
  React.useEffect(resetStateValues, [doctorRecord]);
  const validations = {
    firstName: [],
    lastName: [],
    phoneNum: [],
    email: [],
    zipcode: [],
    city: [],
    state: [],
    field: [],
    workYear: [],
    info: [],
    intro: [],
    iconPic: [],
    bkgdPic: [],
    profilePic: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          firstName,
          lastName,
          phoneNum,
          email,
          zipcode,
          city,
          state,
          field,
          workYear,
          info,
          intro,
          iconPic,
          bkgdPic,
          profilePic,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Doctor.copyOf(doctorRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "DoctorUpdateForm")}
      {...rest}
    >
      <TextField
        label="First name"
        isRequired={false}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName: value,
              lastName,
              phoneNum,
              email,
              zipcode,
              city,
              state,
              field,
              workYear,
              info,
              intro,
              iconPic,
              bkgdPic,
              profilePic,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks("firstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("firstName", firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={false}
        isReadOnly={false}
        value={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName: value,
              phoneNum,
              email,
              zipcode,
              city,
              state,
              field,
              workYear,
              info,
              intro,
              iconPic,
              bkgdPic,
              profilePic,
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks("lastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("lastName", lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
        {...getOverrideProps(overrides, "lastName")}
      ></TextField>
      <TextField
        label="Phone num"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={phoneNum}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              phoneNum: value,
              email,
              zipcode,
              city,
              state,
              field,
              workYear,
              info,
              intro,
              iconPic,
              bkgdPic,
              profilePic,
            };
            const result = onChange(modelFields);
            value = result?.phoneNum ?? value;
          }
          if (errors.phoneNum?.hasError) {
            runValidationTasks("phoneNum", value);
          }
          setPhoneNum(value);
        }}
        onBlur={() => runValidationTasks("phoneNum", phoneNum)}
        errorMessage={errors.phoneNum?.errorMessage}
        hasError={errors.phoneNum?.hasError}
        {...getOverrideProps(overrides, "phoneNum")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              phoneNum,
              email: value,
              zipcode,
              city,
              state,
              field,
              workYear,
              info,
              intro,
              iconPic,
              bkgdPic,
              profilePic,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Zipcode"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={zipcode}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              phoneNum,
              email,
              zipcode: value,
              city,
              state,
              field,
              workYear,
              info,
              intro,
              iconPic,
              bkgdPic,
              profilePic,
            };
            const result = onChange(modelFields);
            value = result?.zipcode ?? value;
          }
          if (errors.zipcode?.hasError) {
            runValidationTasks("zipcode", value);
          }
          setZipcode(value);
        }}
        onBlur={() => runValidationTasks("zipcode", zipcode)}
        errorMessage={errors.zipcode?.errorMessage}
        hasError={errors.zipcode?.hasError}
        {...getOverrideProps(overrides, "zipcode")}
      ></TextField>
      <TextField
        label="City"
        isRequired={false}
        isReadOnly={false}
        value={city}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              phoneNum,
              email,
              zipcode,
              city: value,
              state,
              field,
              workYear,
              info,
              intro,
              iconPic,
              bkgdPic,
              profilePic,
            };
            const result = onChange(modelFields);
            value = result?.city ?? value;
          }
          if (errors.city?.hasError) {
            runValidationTasks("city", value);
          }
          setCity(value);
        }}
        onBlur={() => runValidationTasks("city", city)}
        errorMessage={errors.city?.errorMessage}
        hasError={errors.city?.hasError}
        {...getOverrideProps(overrides, "city")}
      ></TextField>
      <TextField
        label="State"
        isRequired={false}
        isReadOnly={false}
        value={state}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              phoneNum,
              email,
              zipcode,
              city,
              state: value,
              field,
              workYear,
              info,
              intro,
              iconPic,
              bkgdPic,
              profilePic,
            };
            const result = onChange(modelFields);
            value = result?.state ?? value;
          }
          if (errors.state?.hasError) {
            runValidationTasks("state", value);
          }
          setState(value);
        }}
        onBlur={() => runValidationTasks("state", state)}
        errorMessage={errors.state?.errorMessage}
        hasError={errors.state?.hasError}
        {...getOverrideProps(overrides, "state")}
      ></TextField>
      <TextField
        label="Field"
        isRequired={false}
        isReadOnly={false}
        value={field}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              phoneNum,
              email,
              zipcode,
              city,
              state,
              field: value,
              workYear,
              info,
              intro,
              iconPic,
              bkgdPic,
              profilePic,
            };
            const result = onChange(modelFields);
            value = result?.field ?? value;
          }
          if (errors.field?.hasError) {
            runValidationTasks("field", value);
          }
          setField(value);
        }}
        onBlur={() => runValidationTasks("field", field)}
        errorMessage={errors.field?.errorMessage}
        hasError={errors.field?.hasError}
        {...getOverrideProps(overrides, "field")}
      ></TextField>
      <TextField
        label="Work year"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={workYear}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              phoneNum,
              email,
              zipcode,
              city,
              state,
              field,
              workYear: value,
              info,
              intro,
              iconPic,
              bkgdPic,
              profilePic,
            };
            const result = onChange(modelFields);
            value = result?.workYear ?? value;
          }
          if (errors.workYear?.hasError) {
            runValidationTasks("workYear", value);
          }
          setWorkYear(value);
        }}
        onBlur={() => runValidationTasks("workYear", workYear)}
        errorMessage={errors.workYear?.errorMessage}
        hasError={errors.workYear?.hasError}
        {...getOverrideProps(overrides, "workYear")}
      ></TextField>
      <TextField
        label="Info"
        isRequired={false}
        isReadOnly={false}
        value={info}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              phoneNum,
              email,
              zipcode,
              city,
              state,
              field,
              workYear,
              info: value,
              intro,
              iconPic,
              bkgdPic,
              profilePic,
            };
            const result = onChange(modelFields);
            value = result?.info ?? value;
          }
          if (errors.info?.hasError) {
            runValidationTasks("info", value);
          }
          setInfo(value);
        }}
        onBlur={() => runValidationTasks("info", info)}
        errorMessage={errors.info?.errorMessage}
        hasError={errors.info?.hasError}
        {...getOverrideProps(overrides, "info")}
      ></TextField>
      <TextField
        label="Intro"
        isRequired={false}
        isReadOnly={false}
        value={intro}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              phoneNum,
              email,
              zipcode,
              city,
              state,
              field,
              workYear,
              info,
              intro: value,
              iconPic,
              bkgdPic,
              profilePic,
            };
            const result = onChange(modelFields);
            value = result?.intro ?? value;
          }
          if (errors.intro?.hasError) {
            runValidationTasks("intro", value);
          }
          setIntro(value);
        }}
        onBlur={() => runValidationTasks("intro", intro)}
        errorMessage={errors.intro?.errorMessage}
        hasError={errors.intro?.hasError}
        {...getOverrideProps(overrides, "intro")}
      ></TextField>
      <TextField
        label="Icon pic"
        isRequired={false}
        isReadOnly={false}
        value={iconPic}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              phoneNum,
              email,
              zipcode,
              city,
              state,
              field,
              workYear,
              info,
              intro,
              iconPic: value,
              bkgdPic,
              profilePic,
            };
            const result = onChange(modelFields);
            value = result?.iconPic ?? value;
          }
          if (errors.iconPic?.hasError) {
            runValidationTasks("iconPic", value);
          }
          setIconPic(value);
        }}
        onBlur={() => runValidationTasks("iconPic", iconPic)}
        errorMessage={errors.iconPic?.errorMessage}
        hasError={errors.iconPic?.hasError}
        {...getOverrideProps(overrides, "iconPic")}
      ></TextField>
      <TextField
        label="Bkgd pic"
        isRequired={false}
        isReadOnly={false}
        value={bkgdPic}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              phoneNum,
              email,
              zipcode,
              city,
              state,
              field,
              workYear,
              info,
              intro,
              iconPic,
              bkgdPic: value,
              profilePic,
            };
            const result = onChange(modelFields);
            value = result?.bkgdPic ?? value;
          }
          if (errors.bkgdPic?.hasError) {
            runValidationTasks("bkgdPic", value);
          }
          setBkgdPic(value);
        }}
        onBlur={() => runValidationTasks("bkgdPic", bkgdPic)}
        errorMessage={errors.bkgdPic?.errorMessage}
        hasError={errors.bkgdPic?.hasError}
        {...getOverrideProps(overrides, "bkgdPic")}
      ></TextField>
      <TextField
        label="Profile pic"
        isRequired={false}
        isReadOnly={false}
        value={profilePic}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              firstName,
              lastName,
              phoneNum,
              email,
              zipcode,
              city,
              state,
              field,
              workYear,
              info,
              intro,
              iconPic,
              bkgdPic,
              profilePic: value,
            };
            const result = onChange(modelFields);
            value = result?.profilePic ?? value;
          }
          if (errors.profilePic?.hasError) {
            runValidationTasks("profilePic", value);
          }
          setProfilePic(value);
        }}
        onBlur={() => runValidationTasks("profilePic", profilePic)}
        errorMessage={errors.profilePic?.errorMessage}
        hasError={errors.profilePic?.hasError}
        {...getOverrideProps(overrides, "profilePic")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || doctor)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || doctor) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
