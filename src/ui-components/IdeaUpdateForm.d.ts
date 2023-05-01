/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Idea } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type IdeaUpdateFormInputValues = {
    content?: string;
    owner?: string;
};
export declare type IdeaUpdateFormValidationValues = {
    content?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type IdeaUpdateFormOverridesProps = {
    IdeaUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type IdeaUpdateFormProps = React.PropsWithChildren<{
    overrides?: IdeaUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    idea?: Idea;
    onSubmit?: (fields: IdeaUpdateFormInputValues) => IdeaUpdateFormInputValues;
    onSuccess?: (fields: IdeaUpdateFormInputValues) => void;
    onError?: (fields: IdeaUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: IdeaUpdateFormInputValues) => IdeaUpdateFormInputValues;
    onValidate?: IdeaUpdateFormValidationValues;
} & React.CSSProperties>;
export default function IdeaUpdateForm(props: IdeaUpdateFormProps): React.ReactElement;
