/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Procedure } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ProcedureCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    what: "",
    why: "",
    options: "",
    lifeAfter: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [what, setWhat] = React.useState(initialValues.what);
  const [why, setWhy] = React.useState(initialValues.why);
  const [options, setOptions] = React.useState(initialValues.options);
  const [lifeAfter, setLifeAfter] = React.useState(initialValues.lifeAfter);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setWhat(initialValues.what);
    setWhy(initialValues.why);
    setOptions(initialValues.options);
    setLifeAfter(initialValues.lifeAfter);
    setErrors({});
  };
  const validations = {
    name: [],
    what: [],
    why: [],
    options: [],
    lifeAfter: [],
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
          name,
          what,
          why,
          options,
          lifeAfter,
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
          await DataStore.save(new Procedure(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ProcedureCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              what,
              why,
              options,
              lifeAfter,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="What"
        isRequired={false}
        isReadOnly={false}
        value={what}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              what: value,
              why,
              options,
              lifeAfter,
            };
            const result = onChange(modelFields);
            value = result?.what ?? value;
          }
          if (errors.what?.hasError) {
            runValidationTasks("what", value);
          }
          setWhat(value);
        }}
        onBlur={() => runValidationTasks("what", what)}
        errorMessage={errors.what?.errorMessage}
        hasError={errors.what?.hasError}
        {...getOverrideProps(overrides, "what")}
      ></TextField>
      <TextField
        label="Why"
        isRequired={false}
        isReadOnly={false}
        value={why}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              what,
              why: value,
              options,
              lifeAfter,
            };
            const result = onChange(modelFields);
            value = result?.why ?? value;
          }
          if (errors.why?.hasError) {
            runValidationTasks("why", value);
          }
          setWhy(value);
        }}
        onBlur={() => runValidationTasks("why", why)}
        errorMessage={errors.why?.errorMessage}
        hasError={errors.why?.hasError}
        {...getOverrideProps(overrides, "why")}
      ></TextField>
      <TextField
        label="Options"
        isRequired={false}
        isReadOnly={false}
        value={options}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              what,
              why,
              options: value,
              lifeAfter,
            };
            const result = onChange(modelFields);
            value = result?.options ?? value;
          }
          if (errors.options?.hasError) {
            runValidationTasks("options", value);
          }
          setOptions(value);
        }}
        onBlur={() => runValidationTasks("options", options)}
        errorMessage={errors.options?.errorMessage}
        hasError={errors.options?.hasError}
        {...getOverrideProps(overrides, "options")}
      ></TextField>
      <TextField
        label="Life after"
        isRequired={false}
        isReadOnly={false}
        value={lifeAfter}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              what,
              why,
              options,
              lifeAfter: value,
            };
            const result = onChange(modelFields);
            value = result?.lifeAfter ?? value;
          }
          if (errors.lifeAfter?.hasError) {
            runValidationTasks("lifeAfter", value);
          }
          setLifeAfter(value);
        }}
        onBlur={() => runValidationTasks("lifeAfter", lifeAfter)}
        errorMessage={errors.lifeAfter?.errorMessage}
        hasError={errors.lifeAfter?.hasError}
        {...getOverrideProps(overrides, "lifeAfter")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
