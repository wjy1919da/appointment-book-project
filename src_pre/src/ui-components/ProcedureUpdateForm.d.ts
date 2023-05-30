/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Procedure } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProcedureUpdateFormInputValues = {
    name?: string;
    what?: string;
    why?: string;
    options?: string;
    lifeAfter?: string;
};
export declare type ProcedureUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    what?: ValidationFunction<string>;
    why?: ValidationFunction<string>;
    options?: ValidationFunction<string>;
    lifeAfter?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProcedureUpdateFormOverridesProps = {
    ProcedureUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    what?: PrimitiveOverrideProps<TextFieldProps>;
    why?: PrimitiveOverrideProps<TextFieldProps>;
    options?: PrimitiveOverrideProps<TextFieldProps>;
    lifeAfter?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProcedureUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProcedureUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    procedure?: Procedure;
    onSubmit?: (fields: ProcedureUpdateFormInputValues) => ProcedureUpdateFormInputValues;
    onSuccess?: (fields: ProcedureUpdateFormInputValues) => void;
    onError?: (fields: ProcedureUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProcedureUpdateFormInputValues) => ProcedureUpdateFormInputValues;
    onValidate?: ProcedureUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProcedureUpdateForm(props: ProcedureUpdateFormProps): React.ReactElement;
