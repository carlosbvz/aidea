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
export declare type IdeaCreateFormInputValues = {
    content?: string;
    owner?: string;
};
export declare type IdeaCreateFormValidationValues = {
    content?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type IdeaCreateFormOverridesProps = {
    IdeaCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type IdeaCreateFormProps = React.PropsWithChildren<{
    overrides?: IdeaCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: IdeaCreateFormInputValues) => IdeaCreateFormInputValues;
    onSuccess?: (fields: IdeaCreateFormInputValues) => void;
    onError?: (fields: IdeaCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: IdeaCreateFormInputValues) => IdeaCreateFormInputValues;
    onValidate?: IdeaCreateFormValidationValues;
} & React.CSSProperties>;
export default function IdeaCreateForm(props: IdeaCreateFormProps): React.ReactElement;
