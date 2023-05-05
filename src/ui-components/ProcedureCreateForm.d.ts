/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProcedureCreateFormInputValues = {
    name?: string;
    what?: string;
    why?: string;
    options?: string;
    lifeAfter?: string;
};
export declare type ProcedureCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    what?: ValidationFunction<string>;
    why?: ValidationFunction<string>;
    options?: ValidationFunction<string>;
    lifeAfter?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProcedureCreateFormOverridesProps = {
    ProcedureCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    what?: PrimitiveOverrideProps<TextFieldProps>;
    why?: PrimitiveOverrideProps<TextFieldProps>;
    options?: PrimitiveOverrideProps<TextFieldProps>;
    lifeAfter?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProcedureCreateFormProps = React.PropsWithChildren<{
    overrides?: ProcedureCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProcedureCreateFormInputValues) => ProcedureCreateFormInputValues;
    onSuccess?: (fields: ProcedureCreateFormInputValues) => void;
    onError?: (fields: ProcedureCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProcedureCreateFormInputValues) => ProcedureCreateFormInputValues;
    onValidate?: ProcedureCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProcedureCreateForm(props: ProcedureCreateFormProps): React.ReactElement;
