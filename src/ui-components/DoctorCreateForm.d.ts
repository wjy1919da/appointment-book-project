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
export declare type DoctorCreateFormInputValues = {
    firstName?: string;
    lastName?: string;
    phoneNum?: number;
    email?: string;
    zipcode?: number;
    city?: string;
    state?: string;
    field?: string;
    workYear?: number;
    info?: string;
    intro?: string;
    iconPic?: string;
    bkgdPic?: string;
    profilePic?: string;
};
export declare type DoctorCreateFormValidationValues = {
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    phoneNum?: ValidationFunction<number>;
    email?: ValidationFunction<string>;
    zipcode?: ValidationFunction<number>;
    city?: ValidationFunction<string>;
    state?: ValidationFunction<string>;
    field?: ValidationFunction<string>;
    workYear?: ValidationFunction<number>;
    info?: ValidationFunction<string>;
    intro?: ValidationFunction<string>;
    iconPic?: ValidationFunction<string>;
    bkgdPic?: ValidationFunction<string>;
    profilePic?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type DoctorCreateFormOverridesProps = {
    DoctorCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    phoneNum?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    zipcode?: PrimitiveOverrideProps<TextFieldProps>;
    city?: PrimitiveOverrideProps<TextFieldProps>;
    state?: PrimitiveOverrideProps<TextFieldProps>;
    field?: PrimitiveOverrideProps<TextFieldProps>;
    workYear?: PrimitiveOverrideProps<TextFieldProps>;
    info?: PrimitiveOverrideProps<TextFieldProps>;
    intro?: PrimitiveOverrideProps<TextFieldProps>;
    iconPic?: PrimitiveOverrideProps<TextFieldProps>;
    bkgdPic?: PrimitiveOverrideProps<TextFieldProps>;
    profilePic?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type DoctorCreateFormProps = React.PropsWithChildren<{
    overrides?: DoctorCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: DoctorCreateFormInputValues) => DoctorCreateFormInputValues;
    onSuccess?: (fields: DoctorCreateFormInputValues) => void;
    onError?: (fields: DoctorCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: DoctorCreateFormInputValues) => DoctorCreateFormInputValues;
    onValidate?: DoctorCreateFormValidationValues;
} & React.CSSProperties>;
export default function DoctorCreateForm(props: DoctorCreateFormProps): React.ReactElement;
